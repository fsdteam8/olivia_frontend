import ClimateCareerGuide from "./_components/climate-career-guide";
import CuratedOpportunities from "./_components/curated-opportunities";
import PageHeader from "./_components/page-header";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHeader />
        <ClimateCareerGuide />
      </div>
      <CuratedOpportunities />
    </div>
  );
};

export default page;
