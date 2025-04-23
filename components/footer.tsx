import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { CountrySelector } from "@/components/country-selector"

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-bold text-xl">Mali Furniture</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Premium furniture for your home and office. Quality craftsmanship and timeless designs.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
            </div>

            {/* Country/Currency Selector in Footer */}
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-2">Select your country and currency:</p>
              <CountrySelector />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/living-room" className="text-muted-foreground hover:text-foreground">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/category/bedroom" className="text-muted-foreground hover:text-foreground">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/category/dining" className="text-muted-foreground hover:text-foreground">
                  Dining
                </Link>
              </li>
              <li>
                <Link href="/category/office" className="text-muted-foreground hover:text-foreground">
                  Office
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mali Furniture. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/shipping" className="hover:text-foreground">
              Shipping Policy
            </Link>
            <Link href="/returns" className="hover:text-foreground">
              Returns & Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
