"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useCurrency } from "@/contexts/currency-context"

// Define the category data structure
type CategoryData = {
  title: string
  description: string
  count: number
  banner: string
  slug: string
}

export function CategoryPage({ slug }: { slug: string }) {
  const { toast } = useToast()
  const { formatPrice } = useCurrency()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")

  // Category data mapping
  const categoryData: Record<string, CategoryData> = {
    sofas: {
      title: "Sofas & Couches",
      description: "Discover our collection of comfortable and stylish sofas and couches for your living space.",
      count: 42,
      banner: "/category-sofas.jpg",
      slug: "sofas",
    },
    chairs: {
      title: "Chairs & Seating",
      description: "Browse our wide range of chairs and seating options for every room in your home.",
      count: 56,
      banner: "/category-chairs.jpg",
      slug: "chairs",
    },
    tables: {
      title: "Tables",
      description: "Explore our selection of coffee tables, dining tables, and side tables for your home.",
      count: 38,
      banner: "/category-tables.jpg",
      slug: "tables",
    },
    beds: {
      title: "Beds & Mattresses",
      description: "Find the perfect bed and mattress for a good night's sleep.",
      count: 24,
      banner: "/category-beds.jpg",
      slug: "beds",
    },
    storage: {
      title: "Storage & Organization",
      description: "Keep your home tidy with our storage and organization solutions.",
      count: 31,
      banner: "/category-storage.jpg",
      slug: "storage",
    },
    lighting: {
      title: "Lighting",
      description: "Illuminate your space with our stylish lighting fixtures.",
      count: 45,
      banner: "/category-lighting.jpg",
      slug: "lighting",
    },
    dining: {
      title: "Dining",
      description: "Create the perfect dining experience with our dining furniture collection.",
      count: 29,
      banner: "/category-dining.jpg",
      slug: "dining",
    },
    // Default for other categories
    default: {
      title: "Products",
      description: "Browse our collection of high-quality furniture.",
      count: 0,
      banner: "/furniture-hero.jpg",
      slug: "default",
    },
  }

  // Get the current category data or use default
  const currentCategory = categoryData[slug] || categoryData.default

  // Mock products data - in a real app, this would be fetched from an API based on the category
  const [products, setProducts] = useState([])

  // Fetch products based on category
  useEffect(() => {
    // This would be an API call in a real application
    const fetchProducts = () => {
      // Mock data for each category
      const categoryProducts = {
        sofas: [
          {
            id: 101,
            name: "Modern Sectional Sofa",
            price: 129999, // Price in KSh
            image: "/sofa.jpg",
            category: "Living Room",
            status: "Available",
            isNew: true,
          },
          {
            id: 102,
            name: "Leather Recliner Sofa",
            price: 89999, // Price in KSh
            image: "/sofa-leather.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 103,
            name: "Convertible Sleeper Sofa",
            price: 79999, // Price in KSh
            image: "/sofa-sleeper.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 104,
            name: "Loveseat Couch",
            price: 59999, // Price in KSh
            image: "/loveseat.jpg",
            category: "Living Room",
            status: "Low Stock",
            isNew: false,
          },
          {
            id: 105,
            name: "Modular Sofa Set",
            price: 149999, // Price in KSh
            image: "/sofa-modular.jpg",
            category: "Living Room",
            status: "Available",
            isNew: true,
          },
          {
            id: 106,
            name: "Chaise Lounge Sofa",
            price: 74999, // Price in KSh
            image: "/sofa-chaise.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
        ],
        chairs: [
          {
            id: 201,
            name: "Modern Lounge Chair",
            price: 29999, // Price in KSh
            image: "/lounge-chair.jpg",
            category: "Living Room",
            status: "Available",
            isNew: true,
          },
          {
            id: 202,
            name: "Ergonomic Office Chair",
            price: 24999, // Price in KSh
            image: "/office-chair.jpg",
            category: "Office",
            status: "Available",
            isNew: false,
          },
          {
            id: 203,
            name: "Accent Armchair",
            price: 34999, // Price in KSh
            image: "/armchair.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 204,
            name: "Dining Chair Set (4)",
            price: 49999, // Price in KSh
            image: "/dining-chairs.jpg",
            category: "Dining",
            status: "Available",
            isNew: true,
          },
          {
            id: 205,
            name: "Rocking Chair",
            price: 27999, // Price in KSh
            image: "/rocking-chair.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 206,
            name: "Bar Stools (Set of 2)",
            price: 19999, // Price in KSh
            image: "/bar-stools.jpg",
            category: "Dining",
            status: "Available",
            isNew: false,
          },
        ],
        tables: [
          {
            id: 301,
            name: "Minimalist Coffee Table",
            price: 19999, // Price in KSh
            image: "/coffee-table.jpg",
            category: "Living Room",
            status: "Available",
            isNew: true,
          },
          {
            id: 302,
            name: "Dining Table",
            price: 59999, // Price in KSh
            image: "/dining-table.jpg",
            category: "Dining",
            status: "Available",
            isNew: false,
          },
          {
            id: 303,
            name: "Side Table",
            price: 14999, // Price in KSh
            image: "/side-table.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 304,
            name: "Executive Desk",
            price: 59999, // Price in KSh
            image: "/desk.jpg",
            category: "Office",
            status: "Available",
            isNew: true,
          },
          {
            id: 305,
            name: "Console Table",
            price: 24999, // Price in KSh
            image: "/console-table.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
        ],
        beds: [
          {
            id: 401,
            name: "Queen Size Bed Frame",
            price: 49999, // Price in KSh
            image: "/bed-frame.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: false,
          },
          {
            id: 402,
            name: "King Size Platform Bed",
            price: 69999, // Price in KSh
            image: "/platform-bed.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: true,
          },
          {
            id: 403,
            name: "Twin Bunk Bed",
            price: 44999, // Price in KSh
            image: "/bunk-bed.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: false,
          },
          {
            id: 404,
            name: "Memory Foam Mattress (Queen)",
            price: 39999, // Price in KSh
            image: "/mattress.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: false,
          },
        ],
        storage: [
          {
            id: 501,
            name: "Bookshelf with Storage",
            price: 34999, // Price in KSh
            image: "/bookshelf.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 502,
            name: "TV Stand with Storage",
            price: 27999, // Price in KSh
            image: "/tv-stand.jpg",
            category: "Living Room",
            status: "Available",
            isNew: false,
          },
          {
            id: 503,
            name: "Dresser with Mirror",
            price: 44999, // Price in KSh
            image: "/dresser.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: false,
          },
          {
            id: 504,
            name: "Storage Ottoman",
            price: 14999, // Price in KSh
            image: "/ottoman.jpg",
            category: "Living Room",
            status: "Available",
            isNew: true,
          },
          {
            id: 505,
            name: "Wardrobe Cabinet",
            price: 59999, // Price in KSh
            image: "/wardrobe.jpg",
            category: "Bedroom",
            status: "Available",
            isNew: false,
          },
        ],
        lighting: [
          {
            id: 601,
            name: "Floor Lamp",
            price: 12999, // Price in KSh
            image: "/floor-lamp.jpg",
            category: "Lighting",
            status: "Available",
            isNew: false,
          },
          {
            id: 602,
            name: "Table Lamp Set (2)",
            price: 9999, // Price in KSh
            image: "/table-lamp.jpg",
            category: "Lighting",
            status: "Available",
            isNew: true,
          },
          {
            id: 603,
            name: "Pendant Light",
            price: 14999, // Price in KSh
            image: "/pendant-light.jpg",
            category: "Lighting",
            status: "Available",
            isNew: false,
          },
          {
            id: 604,
            name: "Chandelier",
            price: 29999, // Price in KSh
            image: "/chandelier.jpg",
            category: "Lighting",
            status: "Available",
            isNew: false,
          },
          {
            id: 605,
            name: "Wall Sconce (Set of 2)",
            price: 8999, // Price in KSh
            image: "/wall-sconce.jpg",
            category: "Lighting",
            status: "Available",
            isNew: false,
          },
        ],
        dining: [
          {
            id: 701,
            name: "Dining Table Set",
            price: 79999, // Price in KSh
            image: "/dining-table.jpg",
            category: "Dining",
            status: "Available",
            isNew: true,
          },
          {
            id: 702,
            name: "Bar Stools (Set of 2)",
            price: 19999, // Price in KSh
            image: "/bar-stools.jpg",
            category: "Dining",
            status: "Available",
            isNew: false,
          },
          {
            id: 703,
            name: "Dining Chairs (Set of 4)",
            price: 49999, // Price in KSh
            image: "/dining-chairs.jpg",
            category: "Dining",
            status: "Available",
            isNew: false,
          },
          {
            id: 704,
            name: "Buffet Cabinet",
            price: 54999, // Price in KSh
            image: "/buffet-cabinet.jpg",
            category: "Dining",
            status: "Available",
            isNew: true,
          },
        ],
      }

      // Set products based on the current category
      setProducts(categoryProducts[slug] || [])
    }

    fetchProducts()
  }, [slug])

  const handleAddToCart = (product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = (product) => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  // Filter products based on search query
  const filteredProducts = products
    .filter((product) => (searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true))
    .sort((a, b) => {
      // Sort products
      switch (sortOption) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return a.isNew ? -1 : 1
        case "featured":
        default:
          return 0
      }
    })

  return (
    <div className="flex flex-col">
      {/* Category Banner */}
      <div className="relative h-[300px] w-full">
        <Image
          src={currentCategory.banner || "/placeholder.svg"}
          alt={currentCategory.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentCategory.title}</h1>
          <p className="max-w-2xl text-center">{currentCategory.description}</p>
          <p className="mt-2 text-sm">{currentCategory.count} items</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in this category..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No products found</h3>
            <p className="mb-6 text-muted-foreground">Try adjusting your search criteria</p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.isNew && <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary">New</Badge>}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="mt-2 font-medium">{formatPrice(product.price)}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Add to cart</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
