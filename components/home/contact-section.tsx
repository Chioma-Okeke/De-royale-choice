import { Clock, MapPin, PhoneCall } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import ContactForm from "../forms/contact-form";
import FadeInWrapper from "../animations/fade-in-wrapper";
import Link from "next/link";

function ContactSection() {
    const mapUrl = "https://maps.app.goo.gl/3z7k8dyodfJFT8qb9"

    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <FadeInWrapper>
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-navy">
                                    Contact Us
                                </h2>
                                <p className="text-gray-500 md:text-xl">
                                    Have questions or ready to get started? Reach
                                    out to us today.
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
                            <div className="flex flex-col items-start gap-2 min-[400px]:flex-row">
                                <Link href={mapUrl} target="_blank">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                                >
                                    Get Directions
                                </Button>
                                </Link>
                            </div>
                        </div>
                        <ContactForm/>
                    </div>
                </div>
            </FadeInWrapper>
        </section>
    );
}

export default ContactSection;
