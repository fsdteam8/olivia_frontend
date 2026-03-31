import { AboutSection } from "@/components/home/AboutSection";
import { CommunityCTA } from "@/components/home/CommunityCTA";
import CommunityFeedback from "@/components/home/CommunityMarquee";
import CommunitySection from "@/components/home/CommunitySection";
import { Features } from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Newsletter } from "@/components/home/Newsletter";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";

export default function Home() {
  return (
    <main className="space-y-[100px]">
      <Hero />
      <Features />
      <AboutSection />
      <WhatWeOffer />
      <HowItWorks />
      <CommunityFeedback />
      <UpcomingEvents />
      <div>
        <CommunityCTA />
        <Newsletter />
      </div>
      <CommunitySection />
      <Footer />
    </main>
  );
}
