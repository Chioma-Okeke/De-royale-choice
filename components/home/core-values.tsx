import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Star } from 'lucide-react'

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
                        <Card className="bg-brand-navy border-brand-yellow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-3 rounded-full bg-brand-yellow">
                                    <Star className="h-8 w-8 text-brand-navy" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-yellow">
                                    Delight our customers always
                                </h3>
                                <p className="text-white">
                                    We go above and beyond to ensure customer
                                    satisfaction with every service.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-brand-navy border-brand-yellow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-3 rounded-full bg-brand-yellow">
                                    <Star className="h-8 w-8 text-brand-navy" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-yellow">
                                    Passionate about our brands
                                </h3>
                                <p className="text-white">
                                    We take pride in our work and are committed
                                    to maintaining our reputation for
                                    excellence.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-brand-navy border-brand-yellow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-3 rounded-full bg-brand-yellow">
                                    <Star className="h-8 w-8 text-brand-navy" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-yellow">
                                    Openness and sincerity
                                </h3>
                                <p className="text-white">
                                    We maintain transparent communication and
                                    honest relationships with our customers.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-brand-navy border-brand-yellow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-3 rounded-full bg-brand-yellow">
                                    <Star className="h-8 w-8 text-brand-navy" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-yellow">
                                    Regal in outlook, Royal in service
                                </h3>
                                <p className="text-white">
                                    We maintain the highest standards in both
                                    our appearance and the quality of our
                                    service.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
  )
}

export default CoreValues