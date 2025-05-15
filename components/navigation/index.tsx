import Link from "next/link";
import React from "react";
import { Logo } from "../Logo/logo";
import { Button } from "../ui/button";
import { PhoneCall } from "lucide-react";

function NavBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="px-4 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link
                        href="#services"
                        className="font-medium hover:text-brand-purple transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="#process"
                        className="font-medium hover:text-brand-purple transition-colors"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#contact"
                        className="font-medium hover:text-brand-purple transition-colors"
                    >
                        Contact
                    </Link>
                </nav>
                <Link href={"tel:"} className="hidden sm:flex text-white items-center gap-2 px-3 py-2 rounded-lg bg-brand-navy hover:bg-brand-purple">
                    <PhoneCall className="mr-2 size-3 md:size-4" />
                    Contact Us
                </Link >
            </div>
        </header>
    );
}

export default NavBar;
