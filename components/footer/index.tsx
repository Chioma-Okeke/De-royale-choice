import React from 'react'
import { Logo } from '../Logo/logo'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <Logo />
                            <p className="text-sm text-gray-500">
                                Professional laundry services with care and
                                attention to detail.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-brand-navy">
                                Services
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>Regular Laundry</li>
                                <li>Dry Cleaning</li>
                                <li>Bedding & Curtains</li>
                                <li>Ironing Service</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-brand-navy">
                                Company
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>About Us</li>
                                <li>Our Team</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-brand-navy">
                                Legal
                            </h3>
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
                            © 2024 DE UNIQUE ROYAL CHOICE DRY CLEANERS. All
                            rights reserved.
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
  )
}

export default Footer