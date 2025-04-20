import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneCall, MapPin, Clock, Star } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-sm font-medium hover:text-brand-purple transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-brand-purple transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-brand-navy hover:bg-brand-purple">
            <PhoneCall className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-lightblue">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-brand-navy">
                  Professional Laundry Service for All Your Needs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  We give a perfect touch to your fabrics with the highest quality standards and attention to detail.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-brand-navy hover:bg-brand-purple" size="lg">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Laundry Service"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-navy">
                Our Services
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                We offer a wide range of laundry services to meet your needs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-lightblue">
                  <Image
                    src="/images/logo.png"
                    alt="Regular Laundry"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Regular Laundry</h3>
                <p className="text-gray-500">
                  Our standard laundry service includes washing, drying, and folding of your everyday clothes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-lightblue">
                  <Image src="/images/logo.png" alt="Dry Cleaning" width={32} height={32} className="object-contain" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Dry Cleaning</h3>
                <p className="text-gray-500">
                  Professional dry cleaning for your delicate garments, suits, dresses, and special fabrics.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-lightblue">
                  <Image
                    src="/images/logo.png"
                    alt="Bedding & Curtains"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Bedding & Curtains</h3>
                <p className="text-gray-500">
                  We clean all types of bedding, curtains, and household textiles with care and attention.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-navy">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Our simple process makes laundry day stress-free
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                  1
                </div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-brand-teal"></div>
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Drop Off</h3>
              <p className="text-gray-500">
                Bring your laundry to our location or schedule a pickup at your convenience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                  2
                </div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-brand-teal"></div>
              </div>
              <h3 className="text-xl font-bold text-brand-navy">We Clean</h3>
              <p className="text-gray-500">
                Our professionals clean your items with care using high-quality products and equipment.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Pick Up</h3>
              <p className="text-gray-500">
                Collect your fresh, clean laundry or have it delivered right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-navy text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-yellow">
                OUR CORE VALUES
              </h2>
              <p className="mx-auto max-w-[700px] text-white md:text-xl">
                The principles that guide our service delivery
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-brand-navy border-brand-yellow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-yellow">
                  <Star className="h-8 w-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-yellow">Delight our customers always</h3>
                <p className="text-white">We go above and beyond to ensure customer satisfaction with every service.</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-navy border-brand-yellow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-yellow">
                  <Star className="h-8 w-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-yellow">Passionate about our brands</h3>
                <p className="text-white">
                  We take pride in our work and are committed to maintaining our reputation for excellence.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-brand-navy border-brand-yellow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-yellow">
                  <Star className="h-8 w-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-yellow">Openness and sincerity</h3>
                <p className="text-white">
                  We maintain transparent communication and honest relationships with our customers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-brand-navy border-brand-yellow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-brand-yellow">
                  <Star className="h-8 w-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-yellow">Regal in outlook, Royal in service</h3>
                <p className="text-white">
                  We maintain the highest standards in both our appearance and the quality of our service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-navy">
                  Contact Us
                </h2>
                <p className="text-gray-500 md:text-xl">
                  Have questions or ready to get started? Reach out to us today.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-purple" />
                  <p>123 Laundry Street, Lagos, Nigeria</p>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneCall className="h-5 w-5 text-brand-purple" />
                  <p>07077977789, 08023346702</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-brand-purple" />
                  <div>
                    <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-brand-navy hover:bg-brand-purple" size="lg">
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Get Directions
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter subject"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message"
                />
              </div>
              <Button className="w-full bg-brand-navy hover:bg-brand-purple">Send Message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-gray-500">Professional laundry services with care and attention to detail.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-brand-navy">Services</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Regular Laundry</li>
                <li>Dry Cleaning</li>
                <li>Bedding & Curtains</li>
                <li>Ironing Service</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-brand-navy">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-brand-navy">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>
                  <Link
                    href="/admin"
                    className="text-gray-400 hover:text-brand-purple text-xs transition-colors"
                    aria-label="Staff Portal"
                  >
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col items-center">
            <p className="text-center text-sm text-gray-500">
              © 2024 DE UNIQUE ROYAL CHOICE DRY CLEANERS. All rights reserved.
            </p>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-gray-500 text-xs mt-2 transition-colors"
              aria-label="Staff Access"
            >
              •
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
