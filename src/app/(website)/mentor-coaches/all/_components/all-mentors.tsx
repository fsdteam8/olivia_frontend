import PageHero from "@/components/home/PageHero";
import CommunitySection from "@/components/home/CommunitySection";
import { MentorsGallery } from "../../_components/mentor-gallery";

const AllMentors = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHero
          bgImage="/mentors-all.jpg"
          subtitle="Connect with experienced professionals across climate sectors who are ready to guide, support, and inspire your journey."
          title="Find the Right Mentor or Coach"
          isHide={true}
        />
      </div>
      <MentorsGallery />
      <div>
        <PageHero
          bgImage="/apply-mentor.jpg"
          subtitle="Join our growing roster of climate leaders and help guide the next generation of changemakers."
          title="Want to Become a Mentor & Coach?"
          buttonTitle="Apply Now"
        />
        <CommunitySection />
      </div>
    </div>
  );
};

export default AllMentors;
