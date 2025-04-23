import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <ProductDetail id={params.id} />
      </main>
      <Footer />
    </div>
  )
}
