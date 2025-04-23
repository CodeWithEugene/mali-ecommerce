"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCurrency } from "@/contexts/currency-context"

export function FeaturedProducts() {
  const { toast } = useToast()
  const { formatPrice } = useCurrency()

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
  ])

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

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Discover our most popular furniture pieces, handpicked for quality and style
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {products.map((product) => (
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
        <div className="flex justify-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
