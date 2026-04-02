"use client";
import { useState } from "react";
import PageHero from "@/components/home/PageHero";
import SuggestCourseModal from "./suggest-course-modal";
import CourseListSection from "./course-list-section";
import CollaborateSection from "./collaborate-section";

const CourseMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-16 lg:space-y-20">
      <PageHero
        bgImage="/courses-bg.jpg"
        subtitle="Check out below the different courses Act on Climate offers to help you better prepare for your career and involvement in the climate space."
        title="Courses"
        buttonTitle="Submit Course Idea"
        setOpen={setIsModalOpen} // Passing the state setter
      />

      <CourseListSection />

      <CollaborateSection setOpen={setIsModalOpen} />

      {/* The Modal Component */}
      <SuggestCourseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default CourseMain;
