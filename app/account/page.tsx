import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { UserAccount } from "@/components/user-account"

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <UserAccount />
      </main>
      <Footer />
    </div>
  )
}
