import { Metadata } from "next";
import PartnerHero from "./_components/PartnerHero";
import PartnerBenefits from "./_components/PartnerBenefits";
import FreeCoursesSection from "./_components/FreeCoursesSection";
import WhoCanJoin from "./_components/WhoCanJoin";
import PartnerHowItWorks from "./_components/PartnerHowItWorks";
import PartnerFAQ from "./_components/PartnerFAQ";
import PartnerCTA from "./_components/PartnerCTA";

export const metadata: Metadata = {
  title: "Educational Partners Program | Act on Climate",
  description:
    "Join the Act on Climate Education Partnership Program and showcase your courses, certificates, workshops and training programs to people looking to build their climate and sustainability knowledge.",
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
      <FreeCoursesSection />
      <WhoCanJoin />
      <PartnerHowItWorks />
      <PartnerFAQ />
      <PartnerCTA />
    </main>
  );
}

