"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight,  CheckCircle2, Globe2, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerHero() {
  return (
    <section className="relative mt-10 overflow-hidden bg-gradient-to-b from-[#F2F8F7] via-white to-white py-16 md:py-24 border-b border-[#E3ECEC]">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E6F4F1] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#EAF5F4] blur-3xl opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#008080]" />
              <span>Act on Climate Educational Partners Program</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#053535] hero-font font-bold leading-[1.15] tracking-tight">
              Empower Global Climate Talent with Your Institution&apos;s Curriculum
            </h1>

            <p className="text-base sm:text-lg text-[#527977] leading-relaxed max-w-2xl">
              Connect your university degree, certificate program, or specialized climate masterclass with thousands of passionate professionals and learners actively transitioning into the green economy.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/survey/education-partner" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#053535] hover:bg-[#084848] text-white px-8 py-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                  <span>Apply as an Education Partner</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-[#053535] text-[#053535] hover:bg-[#E6F4F1] px-7 py-6 rounded-xl font-semibold text-sm transition-all"
                >
                  How the Program Works
                </Button>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                <span>Verified Partner Profile</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                <span>Direct Course Enrollment</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#053535]">
                <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
                <span>Global Talent Pipeline</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                <div className="relative h-[380px] sm:h-[420px] w-full">
                  <Image
                    src="/collaborate-image.jpg"
                    alt="Education Partners collaboration"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#053535]/80 via-transparent to-transparent" />
                </div>

                {/* Floating Institutional Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#053535] text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#053535] truncate">
                      Partner Ecosystem
                    </h4>
                    <p className="text-xs text-[#527977] truncate">
                      Universities, Academies & Research Institutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Pill Top Right */}
              <div className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-full bg-[#053535] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#31c95f]" />
                <span>Global Admissions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-8 border-t border-[#E3ECEC] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-[#F8FCFB] border border-[#E8F2F0]">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#053535] hero-font">10,000+</p>
            <p className="text-xs sm:text-sm text-[#527977] font-medium mt-1">Active Climate Learners</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8FCFB] border border-[#E8F2F0]">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#053535] hero-font">50+</p>
            <p className="text-xs sm:text-sm text-[#527977] font-medium mt-1">Accredited Programs</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8FCFB] border border-[#E8F2F0]">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#053535] hero-font">100%</p>
            <p className="text-xs sm:text-sm text-[#527977] font-medium mt-1">Targeted Audience</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8FCFB] border border-[#E8F2F0]">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#053535] hero-font">Partner</p>
            <p className="text-xs sm:text-sm text-[#527977] font-medium mt-1">Dedicated CMS & Dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
}

