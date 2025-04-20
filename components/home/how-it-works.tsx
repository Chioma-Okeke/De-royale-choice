import React from "react";

function HowItWorks() {
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
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                                1
                            </div>
                            <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-brand-teal"></div>
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">
                            Drop Off
                        </h3>
                        <p className="text-gray-500">
                            Bring your laundry to our location or schedule a
                            pickup at your convenience.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                                2
                            </div>
                            <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-brand-teal"></div>
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">
                            We Clean
                        </h3>
                        <p className="text-gray-500">
                            Our professionals clean your items with care using
                            high-quality products and equipment.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-white text-2xl font-bold">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">
                            Pick Up
                        </h3>
                        <p className="text-gray-500">
                            Collect your fresh, clean laundry or have it
                            delivered right to your doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
