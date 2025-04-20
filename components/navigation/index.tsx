import Link from "next/link";
import React from "react";
import { Logo } from "../Logo/logo";
import { Button } from "../ui/button";
import { PhoneCall } from "lucide-react";

function NavBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link
                        href="#services"
                        className="text-sm font-medium hover:text-brand-purple transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="#process"
                        className="text-sm font-medium hover:text-brand-purple transition-colors"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm font-medium hover:text-brand-purple transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-sm font-medium hover:text-brand-purple transition-colors"
                    >
                        Testimonials
                    </Link>
                    <Link
                        href="#contact"
                        className="text-sm font-medium hover:text-brand-purple transition-colors"
                    >
                        Contact
                    </Link>
                </nav>
                <Button className="bg-brand-navy hover:bg-brand-purple">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Contact Us
                </Button>
            </div>
        </header>
    );
}

export default NavBar;
