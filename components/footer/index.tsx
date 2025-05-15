import React from "react";
import { Logo } from "../Logo/logo";
import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full py-6 bg-gray-100">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4 max-w-[272px]">
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
                </div>
                <div className="mt-8 border-t pt-6 flex flex-col items-center">
                    <p className="text-center text-xs text-gray-500">
                        © 2024 DE UNIQUE ROYAL CHOICE DRY CLEANERS. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
