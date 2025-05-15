import React from "react";
import FadeInWrapper from "../animations/fade-in-wrapper";
import { CheckCircle, Sparkles, Truck } from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            title: "Drop-off or Pickup",
            description: "Bring your laundry to our shop or request a convenient pickup from your location.",
            icon: Truck,
        },
        {
            title: "We Clean with Care",
            description: "Your items are sorted, treated, and cleaned with professional-grade equipment and care.",
            icon: Sparkles,
        },
        {
            title: "Ready for Collection",
            description: "Receive your clean, fresh laundry — folded and ready for use.",
            icon: CheckCircle,
        },
    ];

    return (
        <section
            id="process"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
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
                    {steps.map((step, index) => (
                        <FadeInWrapper key={index} delay={index * 0.2}>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <step.icon className="w-8 h-8 text-primary" />
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </FadeInWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
