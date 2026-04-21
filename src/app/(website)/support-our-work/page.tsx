import React from "react";
import ActOnClimateSponsorship from "./_components/ActOnClimateSponsorship";
import PageHero from "@/components/home/PageHero";

const page = () => {
  return (
    <div>
      <PageHero
        title="Support Our Work"
        bgImage="/supportourwork.jpg"
        subtitle="Partner with Act on Climate to strengthen climate leadership,
expand access to green careers,and drive meaningful community impact."
        buttonTitle="Submit an Inquiry"
        buttonLink="/support-our-work/inquiry"
      />
      <ActOnClimateSponsorship />
    </div>
  );
};

export default page;
