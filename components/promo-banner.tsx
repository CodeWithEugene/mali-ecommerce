import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PromoBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-3">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-sm font-medium">
          Special Offer: Get 15% off on all bedroom furniture! Use code: <span className="font-bold">BEDROOM15</span>
        </p>
        <Link href="/category/bedroom">
          <Button variant="secondary" size="sm">
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
