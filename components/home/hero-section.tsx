import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import FadeInWrapper from "../animations/fade-in-wrapper";
import { color } from "framer-motion";

function Hero() {
    return (
        <section className="w-full py-10 md:py-24 lg:py-20 bg-brand-lightblue">
            <div className="container px-4 md:px-6 w-[90%] mx-auto">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <FadeInWrapper delay={0.1}>
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
                        </div>
                    </FadeInWrapper>
                    <FadeInWrapper delay={0.3}>
                        <div className="flex items-center justify-center max-w-lg">
                            <Image
                                style={{ backgroundColor: "grey" }}
                                src="https://res.cloudinary.com/djrp3aaq9/image/upload/t_Gradient%20fade/v1747241404/de-royale-choice-1_xd42sl.jpg"
                                alt="Laundry Service"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover w-full h-auto"
                            />
                        </div>
                    </FadeInWrapper>
                </div>
            </div>
        </section>
    );
}

export default Hero;
