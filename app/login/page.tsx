import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
