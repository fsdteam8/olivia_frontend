import React from "react";
import BlogDetails from "../_components/BlogDetails";
import ClimateOpportunities from "../_components/ClimateOpportunities";
import CommunitySection from "@/components/home/CommunitySection";

const page = () => {
  return (
    <div>
      <BlogDetails />
      <ClimateOpportunities />
      <CommunitySection />
    </div>
  );
};

export default page;
