import React from "react";
import { Card, CardContent } from "../ui/card";
import { Bed, Shirt, WashingMachine } from "lucide-react";
import FadeInWrapper from "../animations/fade-in-wrapper";

const services = [
    { title: "Regular Laundry", Icon: WashingMachine, desc: "Our standard laundry service includes washing, drying, and folding of your everyday clothes." },
    { title: "Dry Cleaning", Icon: Shirt, desc: "Professional dry cleaning for your delicate garments, suits, dresses, and special fabrics." },
    { title: "Bedding & Curtains", Icon: Bed, desc: "We clean all types of bedding, curtains, and household textiles with care and attention." },
];

function ServicesSection() {
    return (
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-navy">
                            Our Services
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                            We offer a wide range of laundry services to meet
                            your needs
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {services.map(({ Icon, title, desc }, index) => {
                        return (
                            <FadeInWrapper key={index} delay={index * 0.2}>
                                <Card className="border-none shadow-md ">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="p-3 rounded-full bg-brand-lightblue">
                                            <Icon />
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-navy">
                                            {title}
                                        </h3>
                                        <p className="text-gray-500">
                                            {desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </FadeInWrapper>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
