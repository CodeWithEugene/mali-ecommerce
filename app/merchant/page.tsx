import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MerchantDashboard } from "@/components/merchant-dashboard"

export default function MerchantPage() {
  // In a real app, this would check server-side auth
  // For now, we'll simulate this with client-side redirection in the component

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <MerchantDashboard />
      </main>
      <Footer />
    </div>
  )
}
