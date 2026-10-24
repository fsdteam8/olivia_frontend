"use client";

import React from "react";
import { Globe2, BookOpen, ShieldCheck, TrendingUp, Check } from "lucide-react";

const benefits = [
  {
    icon: Globe2,
    badge: "Audience & Reach",
    title: "Global Climate Talent Network",
    description:
      "Directly connect with ambitious professionals, university graduates, and mid-career switchers actively seeking certified education to break into the green economy.",
    highlights: [
      "Access thousands of high-intent climate learners",
      "Reach 40+ countries across Europe, the Americas, Asia & Africa",
      "Targeted audience focused strictly on sustainability and climate action",
    ],
  },
  {
    icon: BookOpen,
    badge: "Showcase & Enrolment",
    title: "Interactive Course & Program Hub",
    description:
      "Present your degrees, executive certificates, online masterclasses, and bootcamps with rich syllabi, instructor bios, and seamless external enrollment links.",
    highlights: [
      "Full SEO visibility in Act on Climate Course Directory",
      "Direct traffic to your university admissions portal or checkout",
      "Support for self-paced, cohort-based, and degree formats",
    ],
  },
  {
    icon: ShieldCheck,
    badge: "Brand & Credibility",
    title: "Verified Institutional Status",
    description:
      "Stand out with an official Verified Partner badge, custom institutional profile page, and priority placement in category searches and platform recommendations.",
    highlights: [
      "Dedicated institutional landing page with logo, faculty & media",
      "Official Verified Partner badge highlighting academic rigor",
      "Featured mentions in our monthly climate education newsletters",
    ],
  },
  {
    icon: TrendingUp,
    badge: "Outcomes & Placements",
    title: "Bridge Directly to Climate Jobs",
    description:
      "Empower your alumni with immediate career pathways. Partner graduates gain direct visibility among climate tech startups, ESG firms, and NGOs hiring on our platform.",
    highlights: [
      "Direct alignment with active climate job listings and fellowships",
      "Measurable career outcomes and student placement tracking",
      "Opportunities for joint virtual career fairs and networking events",
    ],
  },
];

export default function PartnerBenefits() {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase">
            Institutional Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
            Why Leading Institutions Partner With Act on Climate
          </h2>
          <p className="text-base sm:text-lg text-[#527977] leading-relaxed">
            We bridge the gap between academic excellence and real-world climate careers. Offer your curriculum where the next generation of climate innovators is actively learning and hiring.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl p-8 sm:p-10 bg-[#FAFCFC] hover:bg-white border border-[#E3ECEC] hover:border-[#42B0A8]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center group-hover:bg-[#053535] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#008080] bg-[#E6F4F1] px-3 py-1 rounded-full border border-[#BBE3DC]">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#053535] mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-[#527977] text-sm sm:text-base leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#EAF0F0] space-y-2.5">
                  {benefit.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#053535]">
                      <div className="w-4 h-4 rounded-full bg-[#E6F4F1] text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#053535] via-[#004242] to-[#064E4B] text-white p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold hero-font text-[#6CE5D9] mb-1">
                25k+
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                Active Climate Learners & Jobseekers
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold hero-font text-[#6CE5D9] mb-1">
                100%
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                Dedicated Climate & ESG Focus
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold hero-font text-[#6CE5D9] mb-1">
                48 hrs
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                Streamlined Course Onboarding
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold hero-font text-[#6CE5D9] mb-1">
                Direct
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                Enrollment to Your Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

