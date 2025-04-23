"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Box,
  DollarSign,
  Download,
  Edit,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Orders",
      value: "356",
      change: "+12.2%",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Products",
      value: "145",
      change: "+5.4%",
      icon: <Box className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Customers",
      value: "2,420",
      change: "+18.7%",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Modern Lounge Chair",
      price: 299.99,
      image: "/placeholder.svg?height=40&width=40",
      category: "Living Room",
      status: "In Stock",
      inventory: 24,
    },
    {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 199.99,
      image: "/placeholder.svg?height=40&width=40",
      category: "Living Room",
      status: "In Stock",
      inventory: 18,
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/placeholder.svg?height=40&width=40",
      category: "Office",
      status: "Low Stock",
      inventory: 5,
    },
    {
      id: 4,
      name: "Queen Size Bed Frame",
      price: 499.99,
      image: "/placeholder.svg?height=40&width=40",
      category: "Bedroom",
      status: "In Stock",
      inventory: 12,
    },
    {
      id: 5,
      name: "Dining Table Set",
      price: 799.99,
      image: "/placeholder.svg?height=40&width=40",
      category: "Dining",
      status: "Out of Stock",
      inventory: 0,
    },
  ]

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      customer: "Sarah Johnson",
      date: "April 15, 2023",
      status: "Delivered",
      total: 799.97,
    },
    {
      id: "ORD-12346",
      customer: "Michael Chen",
      date: "April 14, 2023",
      status: "Processing",
      total: 349.98,
    },
    {
      id: "ORD-12347",
      customer: "Emily Rodriguez",
      date: "April 13, 2023",
      status: "Shipped",
      total: 1299.99,
    },
    {
      id: "ORD-12348",
      customer: "David Kim",
      date: "April 12, 2023",
      status: "Delivered",
      total: 249.99,
    },
    {
      id: "ORD-12349",
      customer: "Lisa Patel",
      date: "April 11, 2023",
      status: "Cancelled",
      total: 599.98,
    },
  ]

  // Mock data for customers
  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      orders: 5,
      spent: 1245.87,
      joined: "Jan 12, 2023",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      orders: 3,
      spent: 789.45,
      joined: "Feb 23, 2023",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      orders: 8,
      spent: 2567.12,
      joined: "Nov 5, 2022",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@example.com",
      orders: 2,
      spent: 349.99,
      joined: "Mar 18, 2023",
    },
    {
      id: 5,
      name: "Lisa Patel",
      email: "lisa.patel@example.com",
      orders: 6,
      spent: 1876.34,
      joined: "Dec 10, 2022",
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, orders, and customers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-full">{stat.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Revenue Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders across the store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                                ? "outline"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="w-full sm:w-[200px] pl-8" />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative h-10 w-10 rounded-md overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "In Stock"
                              ? "default"
                              : product.status === "Low Stock"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.inventory}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Orders</CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="w-full sm:w-[200px] pl-8" />
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                                ? "outline"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>View and manage customer accounts</CardDescription>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search customers..." className="w-full sm:w-[200px] pl-8" />
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>{customer.joined}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/customers/${customer.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
