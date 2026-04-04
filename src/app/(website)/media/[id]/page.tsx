import React from "react";
import VideoLessonDetail from "../_components/VideoLessonDetail";
import RecentView from "../_components/RecentView";
import CommunitySection from "@/components/home/CommunitySection";

const page = () => {
  return (
    <div>
      <VideoLessonDetail />
      <RecentView />
      <CommunitySection />
    </div>
  );
};

export default page;
