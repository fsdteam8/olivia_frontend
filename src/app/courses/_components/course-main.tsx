"use client";
import { useState } from "react";
import PageHero from "@/components/home/PageHero";
import SuggestCourseModal from "./suggest-course-modal";

const CourseMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHero
        bgImage="/courses-bg.jpg"
        subtitle="Check out below the different courses Act on Climate offers to help you better prepare for your career and involvement in the climate space."
        title="Courses"
        buttonTitle="Submit Course Idea"
        setOpen={setIsModalOpen} // Passing the state setter
      />

      {/* The Modal Component */}
      <SuggestCourseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default CourseMain;
