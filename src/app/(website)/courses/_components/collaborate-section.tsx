"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/home/Newsletter";
import CommunitySection from "@/components/home/CommunitySection";

interface CollaborateSectionProps {
  setOpen: (open: boolean) => void;
}

const CollaborateSection = ({ setOpen }: CollaborateSectionProps) => {
  return (
    <section className="bg-[#EDF2F2]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Left Content */}
          <div className="space-y-6 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#004242] tracking-tight">
              Collaborate With Us
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Act on Climate is committed to delivering the essential resources
              you need to confidently step into the climate space. We&apos;re
              always eager to collaborate on designing powerful, impactful
              courses that help you thrive in your climate journey.
            </p>

            <div className="pt-2">
              <Button
                onClick={() => setOpen(true)}
                className="bg-[#004242] hover:bg-[#003333] text-white px-8 py-6 rounded-md font-bold text-sm"
              >
                Submit Course Idea
              </Button>
            </div>

            <p className="text-gray-500 text-sm md:text-base italic">
              Have a course idea that can empower climate leaders? Let&apos;s
              build it together.
            </p>
          </div>

          {/* Right Image with Border Effect */}
          <div className="relative group">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
                <Image
                  src="/collaborate-image.jpg" // Replace with your image path
                  alt="Team collaborating"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Newsletter />
        <CommunitySection />
      </div>
    </section>
  );
};

export default CollaborateSection;
