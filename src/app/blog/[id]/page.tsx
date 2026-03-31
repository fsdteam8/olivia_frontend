import React from "react";
import BlogDetails from "../_components/BlogDetails";
import ClimateOpportunities from "../_components/ClimateOpportunities";
import CommunitySection from "@/components/home/CommunitySection";
import Footer from "@/components/home/Footer";

const page = () => {
  return (
    <div>
      <BlogDetails />
      <ClimateOpportunities />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default page;
