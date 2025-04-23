import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="container px-4 md:px-6 py-10 md:py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your Space with Premium Furniture
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover our curated collection of high-quality furniture designed to elevate your home and office
                spaces.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  Shop Now
                </Button>
              </Link>
              <Link href="/category/new-arrivals">
                <Button size="lg" variant="outline" className="px-8">
                  New Arrivals
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-medium">✓</span>
                <span className="text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">✓</span>
                <span className="text-muted-foreground">Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">✓</span>
                <span className="text-muted-foreground">Easy Returns</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
            <Image
              src="/furniture-hero.jpg"
              alt="Modern living room with stylish furniture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
