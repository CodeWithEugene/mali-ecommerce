import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Room</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Find the perfect furniture for every space in your home
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] w-full">
              <Image src="/living-room.jpg" alt="Living Room" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
              <h3 className="text-2xl font-bold">Living Room</h3>
              <p className="mb-4 text-sm">Create a space for relaxation and entertainment</p>
              <Link href="/category/sofas">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] w-full">
              <Image src="/bedroom.jpg" alt="Bedroom" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
              <h3 className="text-2xl font-bold">Bedroom</h3>
              <p className="mb-4 text-sm">Design your perfect sleep sanctuary</p>
              <Link href="/category/beds">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] w-full">
              <Image src="/dining-room.jpg" alt="Dining Room" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
              <h3 className="text-2xl font-bold">Dining Room</h3>
              <p className="mb-4 text-sm">Gather around beautiful dining furniture</p>
              <Link href="/category/dining">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
