import React from "react";
import FeaturedCourseSection from "./feature-course-section";
import WhatYouWillLearn from "./what-you-will-learn";
import CourseBenefits from "./course-benefits";
import ExploreOtherCourses from "./other-courses";

const CourseDetails = () => {
  return (
    <div className="space-y-16 lg:space-y-20 mt-16">
      <FeaturedCourseSection />
      <WhatYouWillLearn />
      <CourseBenefits />
      <ExploreOtherCourses />
    </div>
  );
};

export default CourseDetails;
