"use client";

import React from "react";
import { FileEdit, ShieldCheck, LayoutDashboard, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: FileEdit,
    title: "Submit Institutional Survey",
    description:
      "Fill out our brief partner onboarding application detailing your university or academy, curriculum focus areas, and representative contact details. Takes under 5 minutes.",
    badge: "5 Min Application",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Advisory Review & Approval",
    description:
      "Our education advisory committee reviews your programs to ensure quality alignment. Once approved (typically within 48 hours), you receive verified partner status.",
    badge: "Rapid 48h Turnaround",
  },
  {
    number: "03",
    icon: LayoutDashboard,
    title: "Access Partner Dashboard",
    description:
      "Log into your dedicated Partner Portal to publish courses, upload detailed syllabi, set tuition, configure application links, and manage your institution profile.",
    badge: "Full Self-Service Control",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Welcome Students & Grow",
    description:
      "Your courses are promoted across our global network of climate learners. Receive high-intent student leads directly into your admissions funnel.",
    badge: "Global Enrollment",
  },
];

export default function PartnerHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
            How the Educational Partners Program Works
          </h2>
          <p className="text-base sm:text-lg text-[#527977] leading-relaxed">
            We make institutional onboarding effortless. From initial review to publishing your first climate course, our team supports you every step of the way.
          </p>
        </div>

        {/* Steps Grid with Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-8 bg-[#FAFCFC] border border-[#E3ECEC] hover:border-[#42B0A8] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#D5E6E4] group-hover:text-[#42B0A8] transition-colors duration-300 font-mono">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center group-hover:bg-[#053535] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-semibold tracking-wider text-[#008080] bg-[#E6F4F1] px-2.5 py-1 rounded-md mb-3 border border-[#BBE3DC]">
                    {step.badge}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-[#053535] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#527977] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAF0F0] flex items-center text-xs font-semibold text-[#008080] group-hover:translate-x-1 transition-transform duration-200">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="bg-[#E6F4F1] border border-[#BBE3DC] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#053535]">
              Ready to start your institutional application?
            </h4>
            <p className="text-xs sm:text-sm text-[#527977]">
              Join global educators already shaping green career trajectories.
            </p>
          </div>
          <Link href="/survey/education-partner" className="shrink-0 w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#053535] hover:bg-[#084848] text-white px-7 py-5 rounded-xl font-semibold text-xs shadow-md">
              Start Application Survey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

