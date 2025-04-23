"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingBag } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useCurrency } from "@/contexts/currency-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the possible order statuses
type OrderStatus = "processing" | "confirmed" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"

// Define the interface for an order
interface Order {
  id: string
  date: string
  status: OrderStatus
  items: number
  total: number
}

export default function OrdersPage() {
  const { formatPrice } = useCurrency()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Fetch orders (simulated)
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchOrders = async () => {
      setLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock orders data
      const mockOrders: Order[] = [
        {
          id: "ORD-123456",
          date: "April 23, 2023",
          status: "delivered",
          items: 2,
          total: 55996,
        },
        {
          id: "ORD-123455",
          date: "March 15, 2023",
          status: "delivered",
          items: 1,
          total: 29999,
        },
        {
          id: "ORD-123454",
          date: "February 28, 2023",
          status: "cancelled",
          items: 3,
          total: 74997,
        },
        {
          id: "ORD-123453",
          date: "February 10, 2023",
          status: "delivered",
          items: 1,
          total: 19999,
        },
        {
          id: "ORD-123452",
          date: "January 5, 2023",
          status: "shipped",
          items: 2,
          total: 39998,
        },
      ]

      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [])

  // Filter orders based on search query and status
  useEffect(() => {
    let filtered = [...orders]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, statusFilter, orders])

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

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
          <p className="text-muted-foreground mb-6">Track and manage your orders</p>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID..."
                className="pl-8 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1 mb-4 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} {order.items === 1 ? "item" : "items"}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                        <div className="flex gap-2 mt-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/account/orders/${order.id}`}>View Order</Link>
                          </Button>

                          {order.status === "shipped" || order.status === "out_for_delivery" ? (
                            <Button size="sm">Track Package</Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mt-4 mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-8">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters."
                  : "You haven't placed any orders yet."}
              </p>
              <Button asChild size="lg">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
