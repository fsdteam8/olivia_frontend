"use client";
import PageHero from "@/components/home/PageHero";
import React from "react";
import InterviewModal from "./InterviewModal";
import ResourceGridPage from "./Resources";
import InterviewHero from "./InterviewCta";

const MediaMain = () => {
  const [isInterviewModalOpen, setInterviewModalOpen] = React.useState(false);

  return (
    <div>
      <PageHero
        setOpen={setInterviewModalOpen}
        title="Media & Resources"
        bgImage="/media.jpg"
        subtitle="Explore expert insights, inspiring conversations, and powerful climate stories all in one place."
        buttonTitle="Browse Latest Content"
      />
      <ResourceGridPage />
      <InterviewHero />
      <InterviewModal
        isOpen={isInterviewModalOpen}
        setOpen={setInterviewModalOpen}
      />
    </div>
  );
};

export default MediaMain;
