import PageHero from "@/components/home/PageHero";
import React from "react";
import { MentorsGallery } from "../_components/mentor-gallery";
import CommunitySection from "@/components/home/CommunitySection";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHero
          bgImage="/mentors-all.jpg"
          subtitle="Connect with experienced professionals across climate sectors who are ready to guide, support, and inspire your journey."
          title="Find the Right Mentor or Coach"
          isHide={true}
        />
      </div>
      <MentorsGallery />
      <div>
        <CommunitySection />
      </div>
    </div>
  );
};

export default page;
