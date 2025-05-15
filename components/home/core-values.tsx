import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Clock3, ShieldCheck, Smile, Sparkles, Star } from 'lucide-react'
import FadeInWrapper from '../animations/fade-in-wrapper';

const values = [
    {
        title: "Trusted Service",
        description: "Built for transparency and reliability with a track record of satisfied customers.",
        icon: ShieldCheck,
    },
    {
        title: "Quick Turnaround",
        description: "We offer fast processing times without compromising on quality.",
        icon: Clock3,
    },
    {
        title: "Customer First",
        description: "Our staff is friendly, attentive, and ready to meet your laundry needs.",
        icon: Smile,
    },
    {
        title: "Fresh & Clean",
        description: "Expect spotless results every time — handled with modern care techniques.",
        icon: Sparkles,
    },
];

function CoreValues() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-navy text-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-yellow">
                            OUR CORE VALUES
                        </h2>
                        <p className="mx-auto max-w-[700px] text-white md:text-xl">
                            The principles that guide our service delivery
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {values.map((value, index) => (
                        <FadeInWrapper key={index} delay={index * 0.2}>
                            <Card className="bg-brand-navy border-brand-yellow h-full">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <div className="p-3 rounded-full bg-brand-yellow">
                                        <value.icon className="h-8 w-8 text-brand-navy" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-yellow">
                                        {value.title}
                                    </h3>
                                    <p className="text-white">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </FadeInWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CoreValues