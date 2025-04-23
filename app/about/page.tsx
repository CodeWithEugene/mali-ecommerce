import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  )
}
