import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CategoryPage } from "@/components/category-page"

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <CategoryPage slug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}
