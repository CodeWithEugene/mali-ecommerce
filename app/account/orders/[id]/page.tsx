"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/contexts/currency-context"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowLeft, Package, Truck, CheckCircle, Calendar, Clock, Info, Phone, Mail } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

// Define the possible order statuses
type OrderStatus = "processing" | "confirmed" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"

// Define the interface for an order item
interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const orderId = params.id

  // State to hold order details
  const [order, setOrder] = useState<{
    id: string
    date: string
    status: OrderStatus
    items: OrderItem[]
    subtotal: number
    shipping: number
    tax: number
    discount: number
    total: number
    shippingAddress: string
    paymentMethod: string
    trackingNumber?: string
    estimatedDelivery?: string
  } | null>(null)

  const [loading, setLoading] = useState(true)

  // Fetch order details (simulated)
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchOrder = async () => {
      setLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate order data
      const mockOrder = {
        id: orderId,
        date: "April 23, 2023",
        status: "shipped" as OrderStatus,
        items: [
          {
            id: 1,
            name: "Modern Lounge Chair",
            price: 29999,
            image: "/lounge-chair.jpg",
            quantity: 1,
          },
          {
            id: 2,
            name: "Minimalist Coffee Table",
            price: 19999,
            image: "/coffee-table.jpg",
            quantity: 1,
          },
        ],
        subtotal: 49998,
        shipping: 2999,
        tax: 7999,
        discount: 5000,
        total: 55996,
        shippingAddress: "123 Main St, Apt 4B, Nairobi, 00100, Kenya",
        paymentMethod: "Credit Card (Visa ending in 4242)",
        trackingNumber: "MALI-TRACK-123456",
        estimatedDelivery: "April 30, 2023",
      }

      setOrder(mockOrder)
      setLoading(false)
    }

    fetchOrder()
  }, [orderId])

  // Helper function to get status progress percentage
  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return 15
      case "confirmed":
        return 30
      case "shipped":
        return 60
      case "out_for_delivery":
        return 80
      case "delivered":
        return 100
      case "cancelled":
        return 0
      default:
        return 0
    }
  }

  // Helper function to get human-readable status
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "Processing"
      case "confirmed":
        return "Confirmed"
      case "shipped":
        return "Shipped"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  // Helper function to get appropriate status badge variant
  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "outline"
      case "confirmed":
        return "secondary"
      case "shipped":
        return "default"
      case "out_for_delivery":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/account/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">Order Details</h1>
          <p className="text-muted-foreground mb-6">Order #{orderId}</p>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : order ? (
            <div className="space-y-8">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Order Status</CardTitle>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Progress value={getStatusProgress(order.status)} className="h-2" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div
                        className={`${order.status === "processing" || order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <div className="flex justify-center mb-2">
                          <div
                            className={`rounded-full p-2 ${order.status === "processing" || order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "bg-primary/10" : "bg-muted"}`}
                          >
                            <Package className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Order Placed</p>
                      </div>

                      <div
                        className={`${order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <div className="flex justify-center mb-2">
                          <div
                            className={`rounded-full p-2 ${order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "bg-primary/10" : "bg-muted"}`}
                          >
                            <Package className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Processing</p>
                      </div>

                      <div
                        className={`${order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <div className="flex justify-center mb-2">
                          <div
                            className={`rounded-full p-2 ${order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "bg-primary/10" : "bg-muted"}`}
                          >
                            <Truck className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Shipped</p>
                      </div>

                      <div className={`${order.status === "delivered" ? "text-primary" : "text-muted-foreground"}`}>
                        <div className="flex justify-center mb-2">
                          <div
                            className={`rounded-full p-2 ${order.status === "delivered" ? "bg-primary/10" : "bg-muted"}`}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Delivered</p>
                      </div>
                    </div>

                    {order.trackingNumber && (
                      <div className="bg-muted/50 rounded-lg p-4 flex flex-col md:flex-row justify-between">
                        <div className="mb-2 md:mb-0">
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm">{order.trackingNumber}</p>
                        </div>
                        {order.estimatedDelivery && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Estimated Delivery</p>
                              <p className="text-sm">{order.estimatedDelivery}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 justify-between flex-col sm:flex-row">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {item.variant && <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>}
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="font-medium mt-2 sm:mt-0 sm:text-right">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Details Tabs */}
              <Tabs defaultValue="payment">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="payment" className="space-y-4 pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="font-medium mb-1">Payment Method</dt>
                          <dd className="text-muted-foreground">{order.paymentMethod}</dd>
                        </div>
                        <div>
                          <dt className="font-medium mb-1">Order Date</dt>
                          <dd className="text-muted-foreground">{order.date}</dd>
                        </div>
                      </dl>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{formatPrice(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (16% VAT)</span>
                          <span>{formatPrice(order.tax)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-{formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4 pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <dl className="space-y-4 text-sm">
                        <div>
                          <dt className="font-medium mb-1">Shipping Address</dt>
                          <dd className="text-muted-foreground">{order.shippingAddress}</dd>
                        </div>

                        {order.trackingNumber && (
                          <div>
                            <dt className="font-medium mb-1">Tracking Number</dt>
                            <dd className="text-muted-foreground">
                              {order.trackingNumber}
                              <Button variant="link" size="sm" className="pl-0">
                                Track Package
                              </Button>
                            </dd>
                          </div>
                        )}

                        {order.estimatedDelivery && (
                          <div>
                            <dt className="font-medium mb-1">Estimated Delivery</dt>
                            <dd className="text-muted-foreground">{order.estimatedDelivery}</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Need Help?</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            If you have any questions regarding your order, please reach out to our customer support
                            team.
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Phone className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Phone</h4>
                                <p className="text-sm text-muted-foreground">+254 (0) 712 345 678</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Mail className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Email</h4>
                                <p className="text-sm text-muted-foreground">support@malifurniture.co.ke</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Business Hours</h4>
                                <p className="text-sm text-muted-foreground">
                                  Monday - Friday: 9:00 AM - 6:00 PM
                                  <br />
                                  Saturday: 9:00 AM - 5:00 PM
                                  <br />
                                  Sunday: Closed
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href="/products">Continue Shopping</Link>
                </Button>

                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <Button variant="outline" className="flex-1">
                    <Info className="mr-2 h-4 w-4" />
                    Report an Issue
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
              <p className="text-muted-foreground mb-8">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button asChild size="lg">
                <Link href="/account/orders">View Your Orders</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
