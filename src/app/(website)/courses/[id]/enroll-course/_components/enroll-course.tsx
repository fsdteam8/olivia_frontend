import CourseWatchPage from "./course-watch-page";
import ExploreOtherCourses from "../../_components/other-courses";
import CommunitySection from "@/components/home/CommunitySection";

const EnrollCourse = () => {
  return (
    <div className="space-y-16 lg:space-y-20 mt-16">
      <CourseWatchPage />
      {/* <WhatYouWillLearn />
      <CourseBenefits /> */}
      <ExploreOtherCourses />
      <CommunitySection />
    </div>
  );
};

export default EnrollCourse;
