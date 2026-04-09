import React from "react";
import VideoLessonDetail from "../_components/VideoLessonDetail";
import RecentView from "../_components/RecentView";
import CommunitySection from "@/components/home/CommunitySection";
import { Newsletter } from "@/components/home/Newsletter";

const page = () => {
  return (
    <div>
      <VideoLessonDetail />
      <Newsletter />
      <CommunitySection />
    </div>
  );
};

export default page;
