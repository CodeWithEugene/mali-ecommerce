"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, ShieldCheck } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"

export function CheckoutForm() {
  const { formatPrice } = useCurrency()

  const [cartItems] = useState([
    {
      id: 1,
      name: "Modern Lounge Chair",
      price: 29999, // Price in KSh
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 19999, // Price in KSh
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 9,
      name: "Sectional Sofa",
      price: 129999, // Price in KSh
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
  ])

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = subtotal > 50000 ? 0 : 2999 // Free shipping over KSh 50,000
  const total = subtotal + shipping

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+254 712 345 678" />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                <Input id="address2" placeholder="Apt 4B" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Nairobi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">County / Province</Label>
                  <Input id="state" placeholder="Nairobi" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="00100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Kenya" />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="save-address" />
                <Label htmlFor="save-address">Save this address for future orders</Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="credit-card">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiration">Expiration Date</Label>
                      <Input id="expiration" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" />
                  </div>
                </TabsContent>
                <TabsContent value="mpesa" className="pt-4">
                  <div className="text-center py-4">
                    <p className="mb-4">
                      You will receive an M-Pesa payment prompt on your phone to complete your purchase.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                      <Input id="mpesa-number" placeholder="07XX XXX XXX" />
                    </div>
                    <Button className="mt-4">Continue with M-Pesa</Button>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="save-payment" />
                <Label htmlFor="save-payment">Save this payment method for future orders</Label>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-medium">
                      Standard Shipping
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</div>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2 border rounded-lg p-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="font-medium">
                      Express Shipping
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(4999)}</div>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
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
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure checkout</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Place Order
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
