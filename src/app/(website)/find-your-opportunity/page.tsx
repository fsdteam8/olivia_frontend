import { Newsletter } from "@/components/home/Newsletter";
import ClimateCareerGuide from "./_components/climate-career-guide";
import ContributeToClimatePage from "./_components/contribute-to-climate-page";
import PageHeader from "./_components/page-header";
import CommunitySection from "@/components/home/CommunitySection";
import UnifiedOpportunities from "./_components/unified-opportunities";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHeader />
        <ClimateCareerGuide />
      </div>
      <UnifiedOpportunities />
      <div>
        <ContributeToClimatePage />
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default page;
