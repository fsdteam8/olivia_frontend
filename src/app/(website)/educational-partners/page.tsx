import { Metadata } from "next";
import PartnerHero from "./_components/PartnerHero";
import PartnerBenefits from "./_components/PartnerBenefits";
import WhoCanJoin from "./_components/WhoCanJoin";
import PartnerHowItWorks from "./_components/PartnerHowItWorks";
import PartnerFAQ from "./_components/PartnerFAQ";
import PartnerCTA from "./_components/PartnerCTA";

export const metadata: Metadata = {
  title: "Educational Partners Program | Act on Climate",
  description:
    "Partner with Act on Climate to feature your university degrees, certificates, and climate curriculum. Connect directly with thousands of learners transitioning into green careers.",
  keywords: [
    "Climate Education Partners",
    "University Climate Programs",
    "Climate Courses",
    "Sustainability Certificates",
    "Green Jobs Education",
    "Act on Climate",
  ],
};

export default function EducationalPartnersPage() {
  return (
    <main className="min-h-screen bg-white">
      <PartnerHero />
      <PartnerBenefits />
      <WhoCanJoin />
      <PartnerHowItWorks />
      <PartnerFAQ />
      <PartnerCTA />
    </main>
  );
}

