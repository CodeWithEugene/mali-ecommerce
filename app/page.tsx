import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { ShopByCategorySection } from "@/components/shop-by-category-section"
import { PromoBanner } from "@/components/promo-banner"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <PromoBanner />
        <FeaturedProducts />
        <CategoryShowcase />
        <ShopByCategorySection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  )
}
