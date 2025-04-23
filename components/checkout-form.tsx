"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, ShieldCheck, Phone, Truck, ChevronsRight, ChevronsLeft, CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type CheckoutStep = "information" | "shipping" | "payment" | "review" | "confirmation"

type ShippingOption = {
  id: string
  name: string
  description: string
  price: number
  estimatedDelivery: string
}

type PaymentMethod = "credit-card" | "mpesa" | "paypal" | "bank-transfer" | "cash-on-delivery"

export function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { formatPrice } = useCurrency()
  const { items, subtotal, calculateDiscount, calculateShipping, calculateTax, calculateTotal, clearCart } = useCart()
  const { user } = useAuth()

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  // Form state
  const [contactInfo, setContactInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
  })

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    apartment: "",
    city: "Nairobi",
    state: "Nairobi",
    postalCode: "",
    country: "Kenya",
    saveAddress: false,
  })

  const [selectedShippingOption, setSelectedShippingOption] = useState<string>("standard")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("credit-card")

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    mpesaNumber: "",
    savePaymentMethod: false,
  })

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)

  // Shipping options
  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: calculateShipping(),
      estimatedDelivery: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 4999,
      estimatedDelivery: "2-3 business days",
    },
    {
      id: "same-day",
      name: "Same Day Delivery",
      description: "Available for Nairobi only",
      price: 9999,
      estimatedDelivery: "Today (orders before 2 PM)",
    },
  ]

  // Calculate the current shipping cost based on selection
  const getCurrentShippingCost = () => {
    const selected = shippingOptions.find((option) => option.id === selectedShippingOption)
    return selected ? selected.price : 0
  }

  // Calculate total with the selected shipping option
  const calculateFinalTotal = () => {
    const shippingCost = getCurrentShippingCost()
    const discount = calculateDiscount()
    const tax = calculateTax()
    return subtotal + shippingCost + tax - discount
  }

  // Handle form submission for each step
  const handleNextStep = () => {
    // Validation for each step
    if (currentStep === "information") {
      if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all the required fields.",
          variant: "destructive",
        })
        return
      }

      if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
        toast({
          title: "Missing Address",
          description: "Please fill in all the required address fields.",
          variant: "destructive",
        })
        return
      }

      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      // Validate payment details based on selected method
      if (selectedPaymentMethod === "credit-card") {
        if (
          !paymentDetails.cardNumber ||
          !paymentDetails.cardExpiry ||
          !paymentDetails.cardCvv ||
          !paymentDetails.cardName
        ) {
          toast({
            title: "Missing Payment Details",
            description: "Please fill in all the required card details.",
            variant: "destructive",
          })
          return
        }
      } else if (selectedPaymentMethod === "mpesa") {
        if (!paymentDetails.mpesaNumber) {
          toast({
            title: "Missing M-Pesa Number",
            description: "Please enter your M-Pesa phone number.",
            variant: "destructive",
          })
          return
        }
      }

      setCurrentStep("review")
    } else if (currentStep === "review") {
      if (!acceptTerms) {
        toast({
          title: "Terms and Conditions",
          description: "Please accept the terms and conditions to proceed.",
          variant: "destructive",
        })
        return
      }

      handlePlaceOrder()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === "shipping") {
      setCurrentStep("information")
    } else if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setPaymentError(null)

    // Simulate payment processing
    setTimeout(() => {
      // Simulate success most of the time, but occasional failures
      const isSuccessful = Math.random() > 0.2

      if (isSuccessful) {
        // Generate a random order ID
        const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
        setOrderId(newOrderId)
        setCurrentStep("confirmation")
        clearCart() // Clear the cart on successful order
      } else {
        // Show payment error
        setPaymentError("Your payment could not be processed. Please try again or use a different payment method.")
      }

      setIsProcessing(false)
    }, 2000)
  }

  // Helper function to get progress percentage based on current step
  const getProgressPercentage = () => {
    switch (currentStep) {
      case "information":
        return 25
      case "shipping":
        return 50
      case "payment":
        return 75
      case "review":
        return 90
      case "confirmation":
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {currentStep !== "confirmation" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <Progress value={getProgressPercentage()} className="mb-8" />

            <div className="flex justify-between text-sm mb-8">
              <div
                className={`flex items-center ${currentStep === "information" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">
                  1
                </div>
                Information
              </div>
              <div
                className={`flex items-center ${currentStep === "shipping" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">
                  2
                </div>
                Shipping
              </div>
              <div
                className={`flex items-center ${currentStep === "payment" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">
                  3
                </div>
                Payment
              </div>
              <div
                className={`flex items-center ${currentStep === "review" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">
                  4
                </div>
                Review
              </div>
            </div>
          </>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2 space-y-8">
            {/* Information Step */}
            {currentStep === "information" && (
              <>
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name *</Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name *</Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 712 345 678"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        required
                      />
                    </div>

                    {!user && (
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id="create-account"
                          checked={createAccount}
                          onCheckedChange={(checked) => setCreateAccount(!!checked)}
                        />
                        <Label htmlFor="create-account">Create an account for faster checkout next time</Label>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        placeholder="Apt 4B"
                        value={shippingAddress.apartment}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Nairobi"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">County / Province *</Label>
                        <Input
                          id="state"
                          placeholder="Nairobi"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code *</Label>
                        <Input
                          id="postal-code"
                          placeholder="00100"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          placeholder="Kenya"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="save-address"
                        checked={shippingAddress.saveAddress}
                        onCheckedChange={(checked) =>
                          setShippingAddress({ ...shippingAddress, saveAddress: !!checked })
                        }
                      />
                      <Label htmlFor="save-address">Save this address for future orders</Label>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedShippingOption}
                    onValueChange={setSelectedShippingOption}
                    className="space-y-4"
                  >
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center justify-between space-x-2 border rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div>
                            <Label htmlFor={option.id} className="font-medium">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{option.price === 0 ? "Free" : formatPrice(option.price)}</div>
                          <p className="text-sm text-muted-foreground">{option.estimatedDelivery}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-6 bg-muted/50 rounded-lg p-4 flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Delivery Information</h3>
                      <p className="text-sm text-muted-foreground">
                        All orders are processed and shipped within 1-2 business days. Delivery times depend on your
                        location and chosen shipping method. You will receive a tracking number once your order ships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-5 gap-2">
                    <Button
                      variant={selectedPaymentMethod === "credit-card" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setSelectedPaymentMethod("credit-card")}
                    >
                      <CreditCard className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">Credit Card</span>
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "mpesa" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setSelectedPaymentMethod("mpesa")}
                    >
                      <Phone className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">M-Pesa</span>
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "paypal" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setSelectedPaymentMethod("paypal")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.08.423-.146.78-.187.996-1.078 5.513-4.8 7.295-9.447 7.295H8.84c-.186 0-.33.153-.356.337l-1.35 8.505c-.032.204.102.4.31.4h3.146c.186 0 .386-.153.412-.336l.83-5.229a.475.475 0 0 1 .464-.336h.966c4.646 0 8.37-1.782 9.447-7.294.437-2.239.184-4.007-.897-5.05z" />
                      </svg>
                      <span className="text-xs text-center">PayPal</span>
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "bank-transfer" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setSelectedPaymentMethod("bank-transfer")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      <span className="text-xs text-center">Bank Transfer</span>
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "cash-on-delivery" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setSelectedPaymentMethod("cash-on-delivery")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                      <span className="text-xs text-center">Cash on Delivery</span>
                    </Button>
                  </div>

                  {paymentError && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle>Payment Failed</AlertTitle>
                      <AlertDescription>{paymentError}</AlertDescription>
                    </Alert>
                  )}

                  {selectedPaymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiration">Expiration Date (MM/YY)</Label>
                          <Input
                            id="expiration"
                            placeholder="MM/YY"
                            value={paymentDetails.cardExpiry}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentDetails.cardCvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvv: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={paymentDetails.cardName}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "mpesa" && (
                    <div className="space-y-4 pt-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h3 className="font-medium text-green-800 mb-1">How M-Pesa Works</h3>
                        <p className="text-sm text-green-700">
                          Enter your M-Pesa phone number below. Once you place the order, you'll receive an STK push
                          notification on your phone. Follow the instructions to complete the payment.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                        <Input
                          id="mpesa-number"
                          placeholder="07XX XXX XXX"
                          value={paymentDetails.mpesaNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, mpesaNumber: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Enter the phone number registered with M-Pesa</p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "paypal" && (
                    <div className="text-center py-6">
                      <p className="mb-4">
                        You will be redirected to PayPal to complete your payment after reviewing your order.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                          PayPal offers buyer protection and allows you to pay using your PayPal balance, bank account,
                          or credit card.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "bank-transfer" && (
                    <div className="pt-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h3 className="font-medium text-blue-800 mb-1">Bank Transfer Information</h3>
                        <p className="text-sm text-blue-700 mb-2">
                          After placing your order, you'll receive our bank details by email. Please use your Order ID
                          as the payment reference.
                        </p>
                        <div className="text-sm">
                          <p>
                            <strong>Bank:</strong> Mali Bank
                          </p>
                          <p>
                            <strong>Account Name:</strong> Mali Furniture Ltd.
                          </p>
                          <p>
                            <strong>Account Number:</strong> 1234567890
                          </p>
                          <p>
                            <strong>Branch Code:</strong> 100
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your order will be processed once we receive your payment. This typically takes 1-2 business
                        days.
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "cash-on-delivery" && (
                    <div className="pt-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <h3 className="font-medium text-amber-800 mb-1">Cash on Delivery</h3>
                        <p className="text-sm text-amber-700">
                          Pay with cash when your order is delivered. Please ensure you have the exact amount ready. Our
                          delivery personnel will provide a receipt.
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Note: Cash on delivery is only available for orders under KSh 100,000.
                      </p>
                    </div>
                  )}

                  {(selectedPaymentMethod === "credit-card" || selectedPaymentMethod === "mpesa") && (
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="save-payment"
                        checked={paymentDetails.savePaymentMethod}
                        onCheckedChange={(checked) =>
                          setPaymentDetails({ ...paymentDetails, savePaymentMethod: !!checked })
                        }
                      />
                      <Label htmlFor="save-payment">Save this payment method for future orders</Label>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                    <ShieldCheck className="h-4 w-4" />
                    <span>All transactions are secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review Step */}
            {currentStep === "review" && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Items in Your Order</h3>
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant || ""}`} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          {item.variant && <p className="text-xs text-muted-foreground">Variant: {item.variant}</p>}
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name:</p>
                        <p>
                          {contactInfo.firstName} {contactInfo.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email:</p>
                        <p>{contactInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone:</p>
                        <p>{contactInfo.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Shipping Address</h3>
                    <div className="text-sm">
                      <p>
                        {contactInfo.firstName} {contactInfo.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                      <p>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Shipping Method</h3>
                    <div className="text-sm">
                      {shippingOptions.find((option) => option.id === selectedShippingOption)?.name ||
                        "Standard Shipping"}
                      <p className="text-muted-foreground">
                        {shippingOptions.find((option) => option.id === selectedShippingOption)?.estimatedDelivery ||
                          "5-7 business days"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="text-sm">
                      {selectedPaymentMethod === "credit-card" && (
                        <p>Credit Card ending in {paymentDetails.cardNumber.slice(-4) || "****"}</p>
                      )}
                      {selectedPaymentMethod === "mpesa" && <p>M-Pesa ({paymentDetails.mpesaNumber})</p>}
                      {selectedPaymentMethod === "paypal" && <p>PayPal</p>}
                      {selectedPaymentMethod === "bank-transfer" && <p>Bank Transfer</p>}
                      {selectedPaymentMethod === "cash-on-delivery" && <p>Cash on Delivery</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Confirmation Step */}
            {currentStep === "confirmation" && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You For Your Order!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your order has been placed successfully and is being processed.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium">Order Information</h3>
                    <p className="text-lg font-bold my-2">{orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to {contactInfo.email}
                    </p>
                  </div>
                  <div className="space-y-4 text-left mb-6">
                    <h3 className="font-medium">What's Next?</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Order Processing</p>
                          <p className="text-sm text-muted-foreground">
                            We're preparing your order for shipping. This usually takes 1-2 business days.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Shipping</p>
                          <p className="text-sm text-muted-foreground">
                            You'll receive an email with tracking information once your order ships.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Your items will be delivered according to your selected shipping method.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1">
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/account/orders/${orderId}`}>View Order Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            {currentStep !== "confirmation" && (
              <div className="flex justify-between mt-6">
                {currentStep !== "information" ? (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    <ChevronsLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link href="/cart">
                      <ChevronsLeft className="mr-2 h-4 w-4" />
                      Back to Cart
                    </Link>
                  </Button>
                )}
                <Button onClick={handleNextStep} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {currentStep === "review" ? "Place Order" : "Continue"}
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== "confirmation" && (
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant || ""}`} className="flex gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{getCurrentShippingCost() === 0 ? "Free" : formatPrice(getCurrentShippingCost())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (16% VAT)</span>
                      <span>{formatPrice(calculateTax())}</span>
                    </div>
                    {calculateDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(calculateDiscount())}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(calculateFinalTotal())}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
