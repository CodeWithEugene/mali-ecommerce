import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}
