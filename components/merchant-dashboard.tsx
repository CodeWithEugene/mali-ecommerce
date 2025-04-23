"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { BarChart3, Box, DollarSign, Download, Plus, ShoppingCart, TrendingUp, Users } from "lucide-react"

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
      value: "$12,543.89",
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
      price: 299.99,
      image: "/lounge-chair.jpg",
      category: "Living Room",
      status: "Available",
      inventory: 24,
    },
    {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 199.99,
      image: "/coffee-table.jpg",
      category: "Living Room",
      status: "Available",
      inventory: 18,
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/office-chair.jpg",
      category: "Office",
      status: "Low Stock",
      inventory: 5,
    },
    {
      id: 4,
      name: "Queen Size Bed Frame",
      price: 499.99,
      image: "/bed-frame.jpg",
      category: "Bedroom",
      status: "Available",
      inventory: 12,
    },
    {
      id: 5,
      name: "Dining Table Set",
      price: 799.99,
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
      total: 799.97,
    },
    {
      id: "ORD-12346",
      customer: "Mwangi Ochieng",
      date: "April 14, 2023",
      status: "Processing",
      total: 349.98,
    },
    {
      id: "ORD-12347",
      customer: "Akinyi Otieno",
      date: "April 13, 2023",
      status: "Shipped",
      total: 1299.99,
    },
    {
      id: "ORD-12348",
      customer: "Njoroge Kimani",
      date: "April 12, 2023",
      status: "Delivered",
      total: 249.99,
    },
    {
      id: "ORD-12349",
      customer: "Atieno Wekesa",
      date: "April 11, 2023",
      status: "Cancelled",
      total: 599.98,
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
      price: Number.parseFloat(newProduct.price),
      image: newProduct.image || "/placeholder.svg",
      category: newProduct.category,
      status: Number.parseInt(newProduct.inventory) > 0 ? (Number.parseInt(newProduct.inventory) < 5 ? "Low Stock" : "Available") : "Out of Stock",
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
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          name: newProduct.name,
          price: Number.parseFloat(newProduct.price),
          image: newProduct.image,
          category: newProduct.category,
          status: Number.parseInt(newProduct.inventory) > 0 ? (Number.parseInt(newProduct.inventory) < 5 ? "Low Stock" : "Available") : "Out of Stock",
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
    setProducts(products.filter(product => product.id !== id))
    
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
          <Button onClick={() => {
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
          }}>
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
                <CardDescription>Latest 5 orders for your products</CardDescription>\
