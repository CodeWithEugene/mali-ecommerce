"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Heart, Search, SlidersHorizontal, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"

export function ProductListing() {
  const { toast } = useToast()
  const { formatPrice } = useCurrency()
  const { addItem } = useCart()

  const [products] = useState([
    {
      id: 1,
      name: "Modern Lounge Chair",
      price: 29999, // Price in KSh
      image: "/lounge-chair.jpg",
      category: "Living Room",
      status: "Available",
      isNew: true,
      isFeatured: true,
    },
    {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 19999, // Price in KSh
      image: "/coffee-table.jpg",
      category: "Living Room",
      status: "Available",
      isNew: true,
      isFeatured: true,
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 24999, // Price in KSh
      image: "/office-chair.jpg",
      category: "Office",
      status: "Available",
      isNew: false,
      isFeatured: true,
    },
    {
      id: 4,
      name: "Queen Size Bed Frame",
      price: 49999, // Price in KSh
      image: "/bed-frame.jpg",
      category: "Bedroom",
      status: "Available",
      isNew: false,
      isFeatured: true,
    },
    {
      id: 5,
      name: "Dining Table Set",
      price: 79999, // Price in KSh
      image: "/dining-table.jpg",
      category: "Dining",
      status: "Available",
      isNew: true,
      isFeatured: false,
    },
    {
      id: 6,
      name: "Bookshelf with Storage",
      price: 34999, // Price in KSh
      image: "/bookshelf.jpg",
      category: "Living Room",
      status: "Available",
      isNew: false,
      isFeatured: false,
    },
    {
      id: 7,
      name: "Nightstand with Drawer",
      price: 14999, // Price in KSh
      image: "/nightstand.jpg",
      category: "Bedroom",
      status: "Available",
      isNew: false,
      isFeatured: false,
    },
    {
      id: 8,
      name: "Executive Desk",
      price: 59999, // Price in KSh
      image: "/desk.jpg",
      category: "Office",
      status: "Available",
      isNew: true,
      isFeatured: false,
    },
    {
      id: 9,
      name: "Sectional Sofa",
      price: 129999, // Price in KSh
      image: "/sofa.jpg",
      category: "Living Room",
      status: "Available",
      isNew: false,
      isFeatured: true,
    },
    {
      id: 10,
      name: "Dresser with Mirror",
      price: 44999, // Price in KSh
      image: "/dresser.jpg",
      category: "Bedroom",
      status: "Available",
      isNew: false,
      isFeatured: false,
    },
    {
      id: 11,
      name: "Bar Stools (Set of 2)",
      price: 19999, // Price in KSh
      image: "/bar-stools.jpg",
      category: "Dining",
      status: "Available",
      isNew: false,
      isFeatured: false,
    },
    {
      id: 12,
      name: "TV Stand with Storage",
      price: 27999, // Price in KSh
      image: "/tv-stand.jpg",
      category: "Living Room",
      status: "Available",
      isNew: false,
      isFeatured: false,
    },
  ])

  const [priceRange, setPriceRange] = useState([0, 150000])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleStatusChange = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const handleAddToCart = (product) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: null,
      },
      1,
    )
  }

  const handleAddToWishlist = (product) => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const filteredProducts = products
    .filter((product) => {
      // Filter by price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Filter by status
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(product.status)) {
        return false
      }

      return true
    })
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
          return a.isFeatured ? -1 : 1
      }
    })

  // URL parameter handling for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get("category")

    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam])
    }
  }, [])

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Mobile Filter Button */}
        <div className="w-full flex items-center justify-between md:hidden mb-4">
          <h1 className="text-2xl font-bold">All Products</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down your product search with filters</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-2">
                    {["Living Room", "Bedroom", "Dining", "Office"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-mobile-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Status</h3>
                  <div className="space-y-2">
                    {["Available", "Low Stock", "Out of Stock"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-mobile-${status}`}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <Label htmlFor={`status-mobile-${status}`}>{status}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={150000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[250px] lg:w-[280px] sticky top-20">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Accordion type="multiple" defaultValue={["categories", "status", "price"]}>
              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {["Living Room", "Bedroom", "Dining", "Office"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="status">
                <AccordionTrigger>Status</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {["Available", "Low Stock", "Out of Stock"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <Label htmlFor={`status-${status}`}>{status}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{formatPrice(priceRange[0])}</span>
                      <span className="text-sm">{formatPrice(priceRange[1])}</span>
                    </div>
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={150000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
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

          {/* Mobile Sort */}
          <div className="flex md:hidden items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[150px]">
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
            <div className="text-sm text-muted-foreground">{filteredProducts.length} products</div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedStatuses.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleCategoryChange(category)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {category} filter</span>
                  </Button>
                </Badge>
              ))}
              {selectedStatuses.map((status) => (
                <Badge key={status} variant="secondary" className="flex items-center gap-1">
                  {status}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleStatusChange(status)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {status} filter</span>
                  </Button>
                </Badge>
              ))}
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedStatuses([])
                  setSearchQuery("")
                  setPriceRange([0, 150000])
                }}
              >
                Clear all
              </Button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No products found</h3>
              <p className="mb-6 text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedStatuses([])
                  setSearchQuery("")
                  setPriceRange([0, 150000])
                }}
              >
                Reset Filters
              </Button>
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
    </div>
  )
}
