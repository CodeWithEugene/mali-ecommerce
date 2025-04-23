import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ShoppingCart } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <ShoppingCart />
      </main>
      <Footer />
    </div>
  )
}
