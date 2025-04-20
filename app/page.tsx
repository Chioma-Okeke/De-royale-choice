import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShirtIcon, Clock, PhoneCall, MapPin, Star } from "lucide-react"
import NavBar from "@/components/navigation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <NavBar />
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Professional Laundry Service for All Your Needs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  We take care of your clothes with the highest quality standards and attention to detail.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
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
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                We offer a wide range of laundry services to meet your needs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100">
                  <ShirtIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Regular Laundry</h3>
                <p className="text-gray-500">
                  Our standard laundry service includes washing, drying, and folding of your everyday clothes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100">
                  <ShirtIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Dry Cleaning</h3>
                <p className="text-gray-500">
                  Professional dry cleaning for your delicate garments, suits, dresses, and special fabrics.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100">
                  <ShirtIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Bedding & Curtains</h3>
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
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Our simple process makes laundry day stress-free
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white text-2xl font-bold">
                  1
                </div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-emerald-200"></div>
              </div>
              <h3 className="text-xl font-bold">Drop Off</h3>
              <p className="text-gray-500">
                Bring your laundry to our location or schedule a pickup at your convenience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white text-2xl font-bold">
                  2
                </div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-emerald-200"></div>
              </div>
              <h3 className="text-xl font-bold">We Clean</h3>
              <p className="text-gray-500">
                Our professionals clean your items with care using high-quality products and equipment.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Pick Up</h3>
              <p className="text-gray-500">
                Collect your fresh, clean laundry or have it delivered right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Pricing</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Transparent and affordable pricing for all your laundry needs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Regular Clothes</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Shirt</span>
                      <span className="font-medium">₦500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trousers</span>
                      <span className="font-medium">₦700</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dress</span>
                      <span className="font-medium">₦800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jacket</span>
                      <span className="font-medium">₦1,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Bedding</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Bedsheet</span>
                      <span className="font-medium">₦1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duvet Cover</span>
                      <span className="font-medium">₦1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pillowcase</span>
                      <span className="font-medium">₦300</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Curtains & Others</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Window Curtain</span>
                      <span className="font-medium">₦1,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Door Curtain</span>
                      <span className="font-medium">₦2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Towel</span>
                      <span className="font-medium">₦400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tablecloth</span>
                      <span className="font-medium">₦900</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Don't just take our word for it, hear from our satisfied customers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-gray-500">
                    "I've been using CleanPress for over a year now and I'm always impressed with the quality of their
                    service. My clothes come back perfectly clean and neatly folded every time."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 w-10 h-10"></div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Regular Customer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-gray-500">
                    "The staff at CleanPress are professional and friendly. They handled my delicate fabrics with care
                    and everything came back looking brand new. Highly recommend!"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 w-10 h-10"></div>
                    <div>
                      <p className="font-medium">Michael Thompson</p>
                      <p className="text-sm text-gray-500">Business Professional</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-gray-500">
                    "I love the convenience of their service. I drop off my laundry in the morning and pick it up on my
                    way home. It saves me so much time and the results are always perfect."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 w-10 h-10"></div>
                    <div>
                      <p className="font-medium">Jennifer Adams</p>
                      <p className="text-sm text-gray-500">Busy Parent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
                <p className="text-gray-500 md:text-xl">
                  Have questions or ready to get started? Reach out to us today.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <p>123 Laundry Street, Lagos, Nigeria</p>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneCall className="h-5 w-5 text-emerald-600" />
                  <p>+234 123 456 7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg">
                  Call Now
                </Button>
                <Button variant="outline" size="lg">
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
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShirtIcon className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">CleanPress</span>
              </div>
              <p className="text-sm text-gray-500">Professional laundry services with care and attention to detail.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Regular Laundry</li>
                <li>Dry Cleaning</li>
                <li>Bedding & Curtains</li>
                <li>Ironing Service</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>
                  <Link
                    href="/admin"
                    className="text-gray-400 hover:text-emerald-600 text-xs transition-colors"
                    aria-label="Staff Portal"
                  >
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col items-center">
            <p className="text-center text-sm text-gray-500">© 2024 CleanPress Laundry. All rights reserved.</p>
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
