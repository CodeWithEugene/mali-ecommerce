import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Wanjiku Kamau",
      role: "Interior Designer",
      content:
        "Mali Furniture has been my go-to for client projects. The quality is exceptional, and their customer service is unmatched. I always recommend them to my clients.",
      avatar: "/wanjiku.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Mwangi Ochieng",
      role: "Homeowner",
      content:
        "We furnished our entire living room with pieces from Mali, and we couldn't be happier. The furniture is not only beautiful but also incredibly durable.",
      avatar: "/mwangi.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Akinyi Otieno",
      role: "Office Manager",
      content:
        "When we needed to furnish our new office space, Mali provided excellent options that were both stylish and functional. Our team loves the new environment.",
      avatar: "/akinyi.jpg",
      rating: 4,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
