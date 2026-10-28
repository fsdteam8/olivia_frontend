"use client";

import React, { useState } from "react";
import MediaHero from "./MediaHero";
import ResourceGridPage from "./Resources";
import InterviewHero from "./InterviewCta";
import SubmitBlogCTA from "./SubmitBlogCTA";
import MediaClosingCta from "./MediaClosingCta";
import InterviewModal from "./InterviewModal";

const MediaMain = () => {
  const [isInterviewModalOpen, setInterviewModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: Climate Stories. Real People. Meaningful Action. */}
      <MediaHero setOpenInterview={setInterviewModalOpen} />

      {/* 2 & 3. Introduction, 3 Core Category Highlights & Media Grid */}
      <ResourceGridPage />

      {/* 4. Have a Story That Can Inspire Climate Action? */}
      <InterviewHero setOpenInterview={setInterviewModalOpen} />

      {/* 5. Your Voice Belongs in the Climate Conversation */}
      <SubmitBlogCTA />

      {/* 6. Be Part of the Change (Closing CTA) */}
      <MediaClosingCta />

      {/* Interview Application Modal */}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        setOpen={setInterviewModalOpen}
      />
    </div>
  );
};

export default MediaMain;
