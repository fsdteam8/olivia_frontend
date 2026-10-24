"use client";

import React from "react";
import {
  GraduationCap,
  Laptop,
  Microscope,
  Award,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const institutionTypes = [
  {
    icon: GraduationCap,
    title: "Universities & Academic Colleges",
    subtitle: "Degree programs, master's degrees & university certificates",
    examples: [
      "MSc in Climate Science & Environmental Policy",
      "Executive Certificates in Sustainable Finance",
      "University-backed summer schools and diplomas",
    ],
  },
  {
    icon: Laptop,
    title: "EdTech & Climate Bootcamps",
    subtitle: "Accelerators, cohort courses & hands-on practical academies",
    examples: [
      "CleanTech & Solar Energy Installation bootcamps",
      "Carbon Accounting & GHG Protocol sprints",
      "Climate Tech product management accelerators",
    ],
  },
  {
    icon: Microscope,
    title: "Research Centers & NGOs",
    subtitle: "Think tanks, scientific institutes & nonprofit educators",
    examples: [
      "Biodiversity & conservation research fellowships",
      "Climate justice and grassroots advocacy workshops",
      "Renewable energy transition think tank modules",
    ],
  },
  {
    icon: Award,
    title: "Corporate & Professional Institutes",
    subtitle: "Accredited certifications for executives & industry leaders",
    examples: [
      "Corporate ESG Reporting & CSRD compliance courses",
      "Circular Economy supply chain credentials",
      "Life cycle assessment (LCA) certified programs",
    ],
  },
];

const eligibilityCriteria = [
  "Curriculum clearly focused on climate, sustainability, clean energy, or ESG.",
  "Qualified instructors, researchers, or accredited academic faculty.",
  "Structured syllabus with defined learning outcomes and completion credentials.",
  "Dedicated application or enrollment link with clear admission details.",
  "Commitment to student support and quality educational experiences.",
];

export default function WhoCanJoin() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F9F8] border-y border-[#E3ECEC] relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase">
            Eligibility & Audience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
            Who Can Join the Educational Partners Program?
          </h2>
          <p className="text-base sm:text-lg text-[#527977] leading-relaxed">
            Whether you are a global university department or a specialized online climate bootcamp, our platform is designed to spotlight rigorous, impactful climate education.
          </p>
        </div>

        {/* Institution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {institutionTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E3ECEC] hover:border-[#42B0A8] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#008080]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#053535] mb-2 leading-snug">
                    {type.title}
                  </h3>
                  <p className="text-xs text-[#527977] mb-5 leading-relaxed">
                    {type.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <span className="text-[11px] font-semibold tracking-wider text-[#008080] uppercase block">
                    Common Programs:
                  </span>
                  {type.examples.map((example, i) => (
                    <div
                      key={i}
                      className="text-xs text-[#053535] flex items-start gap-1.5"
                    >
                      <span className="text-[#42B0A8] font-bold">•</span>
                      <span className="leading-tight">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Eligibility Criteria & Requirements Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D5E6E4] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#008080] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Partner Quality Standard</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#053535] hero-font">
                What We Look For in Every Application
              </h3>
              <p className="text-sm text-[#527977] leading-relaxed">
                To protect student trust and ensure exceptional career outcomes, every partner course undergoes a straightforward review by our academic panel.
              </p>
              <div className="pt-2">
                <Link href="/survey/education-partner">
                  <Button className="bg-[#053535] hover:bg-[#084848] text-white px-6 py-5 rounded-xl font-semibold text-xs shadow-md">
                    Check Your Eligibility Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#F8FBFA] rounded-2xl p-6 sm:p-8 border border-[#E3ECEC] space-y-3.5">
              <h4 className="text-sm font-bold text-[#053535] mb-2">
                Core Requirements Checklist:
              </h4>
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E6F4F1] text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008080]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#053535] leading-relaxed">
                    {criterion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

