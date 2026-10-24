"use client";

import { useState } from "react";
import CoursesHero from "./courses-hero";
import PartnerLogosStrip from "./partner-logos-strip";
import CourseListSection from "./course-list-section";
import HearFromExperts from "./hear-from-experts";
import CollaborateSection from "./collaborate-section";
import SuggestCourseModal from "./suggest-course-modal";

const CourseMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-16 lg:space-y-20">
      <CoursesHero onOpenSuggestModal={() => setIsModalOpen(true)} />

      <PartnerLogosStrip />

      <CourseListSection />

      <HearFromExperts />

      <CollaborateSection setOpen={setIsModalOpen} />

      <SuggestCourseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default CourseMain;
