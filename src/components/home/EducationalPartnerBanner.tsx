"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EducationalPartnerBanner = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#F4F9F8] via-[#EAF4F3] to-[#E6F4F1] border border-[#CDE4E0] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#053535]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#42B0A8]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide">
                <GraduationCap className="w-4 h-4 text-[#008080]" />
                <span>Educational Partners Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
                Are You a University or Climate Academy?
              </h2>

              <p className="text-sm sm:text-base text-[#527977] leading-relaxed max-w-xl">
                Showcase your degrees, executive certificates, and climate courses directly to over 25,000 ambitious professionals actively pivoting into sustainability and green jobs.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Direct links to your admissions portal</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Official Verified Partner badge</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Dedicated institutional dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>High-intent global student pipeline</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <Link href="/educational-partners" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#053535] hover:bg-[#084848] text-white px-7 py-6 rounded-xl font-semibold text-xs shadow-md flex items-center justify-center gap-2 group">
                    <span>Learn About the Program</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/survey/education-partner" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-[#053535] text-[#053535] hover:bg-white px-7 py-6 rounded-xl font-semibold text-xs transition-all"
                  >
                    Apply as a Partner
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#053535] text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#053535]">
                      Academic & Training Hub
                    </h3>
                    <p className="text-xs text-[#527977]">
                      Join leading institutions on Act on Climate
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#F8FBFA] border border-[#E3ECEC] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#053535]">
                      Student Community
                    </span>
                    <span className="text-xs font-bold text-[#008080]">
                      25,000+ Learners
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F8FBFA] border border-[#E3ECEC] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#053535]">
                      Average Approval Time
                    </span>
                    <span className="text-xs font-bold text-[#008080]">
                      48 Hours
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F8FBFA] border border-[#E3ECEC] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#053535]">
                      Curriculum Categories
                    </span>
                    <span className="text-xs font-bold text-[#008080]">
                      Degree, Bootcamps, Certs
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#527977]">
                    Already a registered partner?{" "}
                    <Link
                      href="/login"
                      className="text-[#053535] font-semibold underline underline-offset-2 hover:text-[#008080]"
                    >
                      Log in to Partner Portal
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

