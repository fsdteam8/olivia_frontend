import { AboutSection } from "@/components/home/AboutSection";
import { AIChatHighlight } from "@/components/home/AIChatHighlight";
import { CommunityCTA } from "@/components/home/CommunityCTA";
import CommunityFeedback from "@/components/home/CommunityMarquee";
import CommunitySection from "@/components/home/CommunitySection";
import { EducationalPartnerBanner } from "@/components/home/EducationalPartnerBanner";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HomeMembershipSection } from "@/components/home/HomeMembershipSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Newsletter } from "@/components/home/Newsletter";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";

export default function Home() {
  return (
    <main className="space-y-[70px] sm:space-y-[90px]">
      <Hero />
      <AIChatHighlight />
      <Features />
      <HomeMembershipSection />
      <HowItWorks />
      <WhatWeOffer />
      <AboutSection />
      <EducationalPartnerBanner />
      <CommunityFeedback />
      <div>
        <UpcomingEvents />
        <CommunityCTA />
        <Newsletter />
        <CommunitySection />
      </div>
    </main>
  );
}

