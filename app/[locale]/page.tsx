import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TemplatesGrid from "@/components/TemplatesGrid";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <TemplatesGrid />
      <Pricing />
      <Testimonials />
      <FAQ />
    </>
  );
}
