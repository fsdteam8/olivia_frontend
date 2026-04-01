import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const RecruitmentSection = () => {
  const requirements = [
    "2+ years of professional experience in any field",
    "Proven leadership and a meaningful record of mentorship or community engagement",
    "A passion for paying it forward and helping shape the next generation of climate leaders",
    "Ready to inspire the next wave of climate leaders? Join our roster of coaches & mentors!",
  ];

  return (
    <section className="bg-[#EDF5F4] py-20 px-6">
      <div className="container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side: Image Container */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border-8 border-white bg-white">
            <Image
              src="/looking.jpg" // Replace with your image path
              alt="People working in a conference room"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl text-[#064E4B]">
            What we&apos;re looking for:
          </h2>

          <ul className="space-y-6">
            {requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#42B0A8] shrink-0 mt-0.5" />
                <span className="text-[#528B8A] text-lg leading-relaxed font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#064E4B] text-white px-8 py-3.5 rounded-xl hover:bg-[#043331] transition-all">
              Apply Here
            </button>
            <button className="bg-white text-[#064E4B] border-2 border-[#064E4B] px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all">
              View All Mentors & Coaches
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
