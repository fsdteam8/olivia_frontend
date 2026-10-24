import { Metadata } from "next";
import CourseMain from "./_components/course-main";

export const metadata: Metadata = {
  title: "Climate Courses & Executive Programs | Act on Climate",
  description:
    "Explore world-class climate courses curated from leading universities, sustainability academies, and global institutes. Learn job-ready skills, earn verified certificates, and accelerate your climate career.",
};

const page = () => {
  return (
    <div>
      <CourseMain />
    </div>
  );
};

export default page;
