import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-lightblue">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-brand-navy">
                                Professional Laundry Service for All Your Needs
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                                We give a perfect touch to your fabrics with the
                                highest quality standards and attention to
                                detail.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button
                                className="bg-brand-navy hover:bg-brand-purple"
                                size="lg"
                            >
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
    );
}

export default Hero;
