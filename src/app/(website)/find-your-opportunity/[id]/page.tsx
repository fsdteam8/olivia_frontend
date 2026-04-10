import CommunitySection from "@/components/home/CommunitySection";
import SimilarOpportunities from "../_components/similar-opportunities";
import JobDetails from "./_components/job-details";

const page = () => {
  return (
    <div>
      <JobDetails />
      <SimilarOpportunities />
      <CommunitySection />
    </div>
  );
};

export default page;
