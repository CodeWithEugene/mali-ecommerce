"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { BarChart3, Box, DollarSign, Download, Plus, ShoppingCart, TrendingUp, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MerchantDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is a merchant
  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "merchant") {
      router.push("/")
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the merchant dashboard.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(false)
  }, [user, router, toast])

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "KSh 12,543.89",
      change: "+15.3%",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Orders",
      value: "124",
      change: "+8.2%",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Products",
      value: "38",
      change: "+2.4%",
      icon: <Box className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Customers",
      value: "573",
      change: "+12.7%",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Modern Lounge Chair",
      price: 29999,
      image: "/lounge-chair.jpg",
      category: "Living Room",
      status: "Available",
      inventory: 24,
    },
    {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 19999,
      image: "/coffee-table.jpg",
      category: "Living Room",
      status: "Available",
      inventory: 18,
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 24999,
      image: "/office-chair.jpg",
      category: "Office",
      status: "Low Stock",
      inventory: 5,
    },
    {
      id: 4,
      name: "Queen Size Bed Frame",
      price: 49999,
      image: "/bed-frame.jpg",
      category: "Bedroom",
      status: "Available",
      inventory: 12,
    },
    {
      id: 5,
      name: "Dining Table Set",
      price: 79999,
      image: "/dining-table.jpg",
      category: "Dining",
      status: "Out of Stock",
      inventory: 0,
    },
  ])

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      customer: "Wanjiku Kamau",
      date: "April 15, 2023",
      status: "Delivered",
      total: 79997,
    },
    {
      id: "ORD-12346",
      customer: "Mwangi Ochieng",
      date: "April 14, 2023",
      status: "Processing",
      total: 34998,
    },
    {
      id: "ORD-12347",
      customer: "Akinyi Otieno",
      date: "April 13, 2023",
      status: "Shipped",
      total: 129999,
    },
    {
      id: "ORD-12348",
      customer: "Njoroge Kimani",
      date: "April 12, 2023",
      status: "Delivered",
      total: 24999,
    },
    {
      id: "ORD-12349",
      customer: "Atieno Wekesa",
      date: "April 11, 2023",
      status: "Cancelled",
      total: 59998,
    },
  ]

  // Form state for adding/editing products
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inventory: "",
    image: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.inventory) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add new product
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      price: Number.parseInt(newProduct.price),
      image: newProduct.image || "/placeholder.svg",
      category: newProduct.category,
      status:
        Number.parseInt(newProduct.inventory) > 0
          ? Number.parseInt(newProduct.inventory) < 5
            ? "Low Stock"
            : "Available"
          : "Out of Stock",
      inventory: Number.parseInt(newProduct.inventory),
      description: newProduct.description,
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      inventory: "",
      image: "",
    })
    setShowAddForm(false)

    toast({
      title: "Product Added",
      description: "Your product has been added successfully.",
    })
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || "",
      inventory: product.inventory.toString(),
      image: product.image,
    })
    setShowAddForm(true)
  }

  const handleUpdateProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.inventory) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update product
    const updatedProducts = products.map((product) => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          name: newProduct.name,
          price: Number.parseInt(newProduct.price),
          image: newProduct.image,
          category: newProduct.category,
          status:
            Number.parseInt(newProduct.inventory) > 0
              ? Number.parseInt(newProduct.inventory) < 5
                ? "Low Stock"
                : "Available"
              : "Out of Stock",
          inventory: Number.parseInt(newProduct.inventory),
          description: newProduct.description,
        }
      }
      return product
    })

    setProducts(updatedProducts)
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      inventory: "",
      image: "",
    })
    setEditingProduct(null)
    setShowAddForm(false)

    toast({
      title: "Product Updated",
      description: "Your product has been updated successfully.",
    })
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Product Deleted",
      description: "Your product has been deleted successfully.",
    })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      inventory: "",
      image: "",
    })
    setShowAddForm(false)
  }

  // Format price in KSh
  const formatPrice = (price) => {
    return `KSh ${(price / 100).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Manage your products and orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button
            onClick={() => {
              setShowAddForm(true)
              setEditingProduct(null)
              setNewProduct({
                name: "",
                price: "",
                category: "",
                description: "",
                inventory: "",
                image: "",
              })
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
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
                <CardDescription>Latest 5 orders for your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : order.status === "Processing"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          {showAddForm ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                <CardDescription>
                  {editingProduct ? "Update the product details below." : "Fill in the details to add a new product."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Modern Lounge Chair"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KSh)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="29999"
                    />
                    <p className="text-xs text-muted-foreground">Enter price in cents (e.g. 29999 for KSh 299.99)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Living Room">Living Room</SelectItem>
                        <SelectItem value="Bedroom">Bedroom</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Storage">Storage</SelectItem>
                        <SelectItem value="Lighting">Lighting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input
                      id="inventory"
                      type="number"
                      value={newProduct.inventory}
                      onChange={(e) => setNewProduct({ ...newProduct, inventory: e.target.value })}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="/product-image.jpg"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Product description..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === "Available"
                                ? "default"
                                : product.status === "Low Stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.inventory}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
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
                            : order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Processing"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
