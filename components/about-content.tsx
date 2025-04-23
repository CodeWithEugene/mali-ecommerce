import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutContent() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Mali Furniture</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-lg">
          Crafting quality furniture for Kenyan homes and offices since 2010
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg">
          <Image src="/about-story.jpg" alt="Mali Furniture workshop" fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Mali Furniture was founded in 2010 by a group of passionate craftsmen in Nairobi with a vision to create
            high-quality, locally-made furniture that combines traditional Kenyan craftsmanship with modern design.
          </p>
          <p className="text-muted-foreground">
            What started as a small workshop has grown into one of Kenya's leading furniture manufacturers and
            retailers, with showrooms across major cities and an extensive online presence. Despite our growth, we
            remain committed to our founding principles of quality, sustainability, and supporting local artisans.
          </p>
          <p className="text-muted-foreground">
            Our name "Mali" means "wealth" in Swahili, reflecting our belief that well-crafted furniture is an
            investment that enriches your life and home for years to come.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Quality Craftsmanship</h3>
            <p className="text-sm text-muted-foreground">
              We take pride in creating furniture that stands the test of time, using premium materials and meticulous
              attention to detail.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Sustainable Practices</h3>
            <p className="text-sm text-muted-foreground">
              We source materials responsibly and implement eco-friendly manufacturing processes to minimize our
              environmental impact.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Supporting Local Talent</h3>
            <p className="text-sm text-muted-foreground">
              We employ and train local artisans, preserving traditional skills while creating employment opportunities
              in our communities.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Customer Satisfaction</h3>
            <p className="text-sm text-muted-foreground">
              We're dedicated to providing exceptional service and ensuring our customers find the perfect furniture for
              their needs.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Leadership Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src="/team-ceo.jpg" alt="Wangari Muthoni - CEO" fill className="object-cover" />
            </div>
            <h3 className="font-bold">Wangari Muthoni</h3>
            <p className="text-sm text-muted-foreground">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src="/team-design.jpg" alt="Jamal Odhiambo - Head of Design" fill className="object-cover" />
            </div>
            <h3 className="font-bold">Jamal Odhiambo</h3>
            <p className="text-sm text-muted-foreground">Head of Design</p>
          </div>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <Image
                src="/team-operations.jpg"
                alt="Amina Wekesa - Operations Director"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-bold">Amina Wekesa</h3>
            <p className="text-sm text-muted-foreground">Operations Director</p>
          </div>
        </div>
      </div>

      {/* Showrooms */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Visit Our Showrooms</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <Image src="/showroom-nairobi.jpg" alt="Nairobi Showroom" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Nairobi Flagship Store</h3>
              <p className="text-sm text-muted-foreground mb-2">123 Kimathi Street, Nairobi CBD</p>
              <p className="text-sm">
                Mon-Sat: 9am - 6pm
                <br />
                Sunday: 11am - 4pm
              </p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <Image src="/showroom-mombasa.jpg" alt="Mombasa Showroom" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Mombasa Branch</h3>
              <p className="text-sm text-muted-foreground mb-2">45 Nyali Road, Mombasa</p>
              <p className="text-sm">
                Mon-Sat: 9am - 6pm
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <Image src="/showroom-kisumu.jpg" alt="Kisumu Showroom" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Kisumu Branch</h3>
              <p className="text-sm text-muted-foreground mb-2">78 Oginga Odinga Street, Kisumu</p>
              <p className="text-sm">
                Mon-Sat: 9am - 5pm
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Space?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Browse our collection of premium furniture or visit one of our showrooms to experience the quality and
          craftsmanship firsthand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
