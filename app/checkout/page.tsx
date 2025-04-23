import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
