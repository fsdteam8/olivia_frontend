import CommunitySection from "@/components/home/CommunitySection";
import { Newsletter } from "@/components/home/Newsletter";
import PageHero from "@/components/home/PageHero";
import React from "react";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <PageHero
        bgImage="/membership.jpg"
        subtitle="Act on Climate brings together students, early-career professionals, and experienced leaders from around the world who are committed to driving climate solutions. We are building a collaborative community for learning, connection, and real-world impact."
        title="Join a Global Climate Community"
        isHide={false}
        buttonTitle="Become a Member"
      />

      <div>
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default page;
