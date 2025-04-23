import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Armchair, Bed, BookOpen, Coffee, Lamp, Sofa, UtensilsCrossed } from "lucide-react"

export function ShopByCategorySection() {
  const categories = [
    {
      name: "Sofas & Couches",
      icon: <Sofa className="h-6 w-6" />,
      href: "/category/sofas",
      count: 42,
    },
    {
      name: "Chairs & Seating",
      icon: <Armchair className="h-6 w-6" />,
      href: "/category/chairs",
      count: 56,
    },
    {
      name: "Tables",
      icon: <Coffee className="h-6 w-6" />,
      href: "/category/tables",
      count: 38,
    },
    {
      name: "Beds & Mattresses",
      icon: <Bed className="h-6 w-6" />,
      href: "/category/beds",
      count: 24,
    },
    {
      name: "Storage & Organization",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/category/storage",
      count: 31,
    },
    {
      name: "Lighting",
      icon: <Lamp className="h-6 w-6" />,
      href: "/category/lighting",
      count: 45,
    },
    {
      name: "Dining",
      icon: <UtensilsCrossed className="h-6 w-6" />,
      href: "/category/dining",
      count: 29,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Browse our extensive collection of furniture categories
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="mb-3 mt-2 rounded-full bg-muted p-2">{category.icon}</div>
                  <h3 className="text-sm font-medium">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
