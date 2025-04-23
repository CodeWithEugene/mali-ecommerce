import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ProductListing } from "@/components/product-listing"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <ProductListing />
      </main>
      <Footer />
    </div>
  )
}
