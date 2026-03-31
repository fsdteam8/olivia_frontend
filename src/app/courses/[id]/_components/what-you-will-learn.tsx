"use client";

import { CheckCircle2 } from "lucide-react";

const topics = [
  "Carbon Tax Implementation",
  "Carbon Pricing Models",
  "Cap-and-Trade Systems",
  "Baseline-and-Credit Mechanisms",
  "International Emission Trading",
];

const WhatYouWillLearn = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="space-y-8">
          {/* Section Heading */}
          <h2 className="text-2xl text-[#004242] tracking-tight">
            What You Will Learn
          </h2>

          {/* Topics Wrapper */}
          <div className="flex flex-wrap gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-200"
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center text-[#004242]">
                  <CheckCircle2 size={18} strokeWidth={1.5} />
                </div>

                {/* Topic Text */}
                <span className="text-gray-500 font-medium text-sm md:text-base whitespace-nowrap">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillLearn;
