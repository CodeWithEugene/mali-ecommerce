"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"

export function ProductDetail({ id }: { id: string }) {
  const { toast } = useToast()
  const { user } = useAuth()
  const { formatPrice } = useCurrency()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()

  // Mock product data - in a real app, this would be fetched from an API
  const products = {
    "1": {
      id: 1,
      name: "Modern Lounge Chair",
      price: 29999, // Price in KSh
      description:
        "A comfortable and stylish lounge chair perfect for any living space. Featuring premium upholstery and solid wood legs, this chair combines modern design with exceptional comfort.",
      features: [
        "Premium fabric upholstery",
        "Solid wood frame and legs",
        "High-density foam cushioning",
        "Ergonomic design for maximum comfort",
        "Easy assembly required",
        "Weight capacity: 300 lbs",
      ],
      specifications: {
        dimensions: '31.5"W x 32.7"D x 33.1"H',
        weight: "42 lbs",
        materials: "Polyester fabric, solid wood, high-density foam",
        colors: "Gray, Blue, Beige",
        warranty: "1 year limited warranty",
      },
      images: ["/lounge-chair.jpg", "/lounge-chair-2.jpg", "/lounge-chair-3.jpg", "/lounge-chair-4.jpg"],
      category: "Living Room",
      status: "In Stock",
      inventory: 24,
      rating: 4.5,
      reviewCount: 28,
      isNew: true,
      relatedProducts: [2, 6, 9],
      reviews: [
        {
          id: 1,
          user: {
            name: "Wanjiku Kamau",
            avatar: "/wanjiku.jpg",
          },
          rating: 5,
          date: "2 months ago",
          comment:
            "This chair is absolutely perfect for my living room! It's comfortable, stylish, and the quality is excellent. Assembly was straightforward and took less than 30 minutes.",
        },
        {
          id: 2,
          user: {
            name: "Mwangi Ochieng",
            avatar: "/mwangi.jpg",
          },
          rating: 4,
          date: "1 month ago",
          comment:
            "Great chair overall. Comfortable and looks exactly like the pictures. The only reason I'm giving it 4 stars instead of 5 is that one of the legs had a small scratch when it arrived.",
        },
      ],
    },
    "2": {
      id: 2,
      name: "Minimalist Coffee Table",
      price: 19999, // Price in KSh
      description:
        "A sleek and minimalist coffee table that adds a touch of elegance to your living room. The clean lines and durable construction make it both stylish and functional.",
      features: [
        "Tempered glass top",
        "Solid wood base",
        "Spacious surface area",
        "Modern minimalist design",
        "Easy assembly",
        "Scratch-resistant surface",
      ],
      specifications: {
        dimensions: '47.2"W x 23.6"D x 16.5"H',
        weight: "35 lbs",
        materials: "Tempered glass, solid wood",
        colors: "Natural, Walnut, Black",
        warranty: "2 year limited warranty",
      },
      images: ["/coffee-table.jpg", "/coffee-table-2.jpg", "/coffee-table-3.jpg", "/coffee-table-4.jpg"],
      category: "Living Room",
      status: "In Stock",
      inventory: 18,
      rating: 4.7,
      reviewCount: 32,
      isNew: true,
      relatedProducts: [1, 6, 9],
      reviews: [
        {
          id: 1,
          user: {
            name: "Akinyi Otieno",
            avatar: "/akinyi.jpg",
          },
          rating: 5,
          date: "3 weeks ago",
          comment:
            "This coffee table is exactly what I was looking for! The glass top is easy to clean and the wood base is sturdy. It complements my living room perfectly.",
        },
        {
          id: 2,
          user: {
            name: "Njoroge Kimani",
            avatar: "/placeholder-user.jpg",
          },
          rating: 4,
          date: "2 months ago",
          comment:
            "Beautiful table that looks more expensive than it is. Assembly was a bit tricky but the end result is worth it. Very happy with my purchase.",
        },
      ],
    },
  }

  const product = products[id] || products["1"]
  const relatedProductsData = product.relatedProducts.map((id) => products[id] || {})

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1)
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${product.inventory} items available in stock.`,
      })
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        variant: null,
      },
      quantity,
    )
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    })
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/category/${product.category.toLowerCase().replace(" ", "-")}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary">New</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">{formatPrice(product.price)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-4 font-medium">Status:</div>
              <Badge
                variant="outline"
                className={product.inventory > 0 ? "text-green-600 border-green-600" : "text-red-600 border-red-600"}
              >
                {product.inventory > 0 ? (product.inventory < 5 ? "Low Stock" : "In Stock") : "Out of Stock"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="font-medium">Quantity:</div>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.inventory}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              {product.inventory > 0 && (
                <p className="text-sm text-muted-foreground">{product.inventory} items available</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.inventory === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inventory === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg" className="flex-1" onClick={handleAddToWishlist}>
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Truck className="mr-2 h-4 w-4" />
              Free shipping on orders over {formatPrice(5000)}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Dimensions</span>
                    <span>{product.specifications.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight</span>
                    <span>{product.specifications.weight}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Materials</span>
                    <span>{product.specifications.materials}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Available Colors</span>
                    <span>{product.specifications.colors}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Warranty</span>
                    <span>{product.specifications.warranty}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                {user ? (
                  <Button>Write a Review</Button>
                ) : (
                  <Button asChild>
                    <Link href="/login">Login to Write a Review</Link>
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={review.user.avatar || "/placeholder.svg"}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.user.name}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                      <p className="text-sm mt-2">{review.comment}</p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="text-center mt-6">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProductsData.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={relatedProduct.images?.[0] || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{relatedProduct.category}</p>
                </div>
                <div className="mt-2 font-medium">{formatPrice(relatedProduct.price)}</div>
                <Button asChild className="w-full mt-4">
                  <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
