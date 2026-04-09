import CourseWatchPage from "./course-watch-page";
// import WhatYouWillLearn from "../../_components/what-you-will-learn";
// import CourseBenefits from "../../_components/course-benefits";
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
