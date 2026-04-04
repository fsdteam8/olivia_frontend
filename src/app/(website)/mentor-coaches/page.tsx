import PageHero from "@/components/home/PageHero";
import React from "react";
import RecruitmentSection from "./_components/recruitment-section";
import WhyJoinRoster from "./_components/why-join-roster";
import { MentorsGallery } from "./_components/mentor-gallery";
import { Newsletter } from "@/components/home/Newsletter";
import CommunitySection from "@/components/home/CommunitySection";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHero
          bgImage="/mentor.jpg"
          subtitle="Looking to get in touch with a mentor or coach? Our database has a wide array of professionals who can help on a variety of climate topics."
          title="Mentors & Coaches"
          isHide={true}
        />
        <RecruitmentSection />
        <WhyJoinRoster />
      </div>
      <MentorsGallery />
      <div>
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default page;
