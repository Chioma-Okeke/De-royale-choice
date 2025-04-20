import NavBar from "@/components/navigation";
import Footer from "@/components/footer";
import Hero from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import CoreValues from "@/components/home/core-values";
import ContactSection from "@/components/home/contact-section";
import ServicesSection from "@/components/home/services-section";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <Hero />
            <ServicesSection />
            <HowItWorks />
            <CoreValues />
            <ContactSection />
            <Footer />
        </div>
    );
}
