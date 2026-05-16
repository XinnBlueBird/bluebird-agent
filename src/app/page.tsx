import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { CodeShowcase } from "@/components/sections/CodeShowcase";
import { Architecture } from "@/components/sections/Architecture";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <HowItWorks />
        <Features />
        <LiveDemo />
        <CodeShowcase />
        <Architecture />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
