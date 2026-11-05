"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Gift, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FreeCoursesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F8FCFB] border-t border-[#E3ECEC] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-[#D5E6E4] shadow-sm relative overflow-hidden">
            {/* Subtle Top-Right Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E6F4F1] to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase">
                <Gift className="w-3.5 h-3.5 text-[#008080]" />
                <span>All Learning Formats Supported</span>
              </div>

              {/* Main Client Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
                Free courses are welcome.
              </h2>

              {/* Main Client Description */}
              <p className="text-base sm:text-lg text-[#527977] leading-relaxed max-w-3xl">
                Education Partners can submit free courses, workshops and learning resources alongside paid programs. Whether your course is free or paid, Act on Climate can help learners discover it.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                <div className="p-5 rounded-2xl bg-[#F8FBFA] border border-[#E3ECEC] space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#008080]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#053535]">
                    Free Courses & Guides
                  </h3>
                  <p className="text-xs text-[#527977] leading-relaxed">
                    Spotlight introductory climate curriculum and open-access materials to engage learners early.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FBFA] border border-[#E3ECEC] space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#008080]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#053535]">
                    Workshops & Masterclasses
                  </h3>
                  <p className="text-xs text-[#527977] leading-relaxed">
                    Host webinars and community sprints with direct links to your institution&apos;s registration page.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FBFA] border border-[#E3ECEC] space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#053535] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#008080]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#053535]">
                    Paid Degrees & Certificates
                  </h3>
                  <p className="text-xs text-[#527977] leading-relaxed">
                    0% commission on course sales. You keep 100% of your course tuition and student revenue.
                  </p>
                </div>
              </div>

              {/* Bottom Reassurance & CTA */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#008080]">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>No referral fees. No transaction fees. No percentage of your course sales.</span>
                </div>

                <Link href="/survey/education-partner" className="shrink-0 w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#053535] hover:bg-[#084848] text-white px-6 py-5 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 group">
                    <span>Become an Education Partner - $150/year</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

