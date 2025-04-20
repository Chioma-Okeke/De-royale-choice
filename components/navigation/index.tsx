import { PhoneCall, ShirtIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShirtIcon className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">CleanPress Laundry</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PhoneCall className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </header>
  )
}

export default NavBar