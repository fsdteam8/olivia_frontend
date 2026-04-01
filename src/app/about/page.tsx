import PageHero from "@/components/home/PageHero";
import React from "react";
import OurMission from "./_components/our-mission";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <PageHero
        bgImage="/about.jpg"
        subtitle="Act on Climate is a website based platform for those who are interested in learning about climate change, getting into the sector, and wanting to take action."
        title="About Act on Climate"
        isHide={true}
      />
      <OurMission />
    </div>
  );
};

export default page;
