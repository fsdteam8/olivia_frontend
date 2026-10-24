"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CoursesHeroProps {
  onOpenSuggestModal: () => void;
}

export default function CoursesHero({ onOpenSuggestModal }: CoursesHeroProps) {
  const scrollToCatalog = () => {
    const el = document.getElementById("course-directory");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[550px] md:h-[600px] w-full flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image with Simple Clean Dark Overlay - exactly like Home & PageHero */}
      <Image
        src="/courses-bg.jpg"
        alt="Act on Climate Courses Background"
        fill
        priority
        sizes="100vw"
        className="object-cover z-0"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(0, 0, 0, 0.60)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-white">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl hero-font tracking-tight leading-tight">
          Explore Climate Courses
        </h1>

        {/* Clear Explanation of Purpose & Source */}
        <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
          Act on Climate curates and offers high-impact courses in collaboration with leading educational partners, universities, and climate academies. Designed to equip you with practical, job-ready skills to prepare for your career and drive real climate solutions.
        </p>

        {/* Action Buttons matching website theme */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            onClick={scrollToCatalog}
            className="bg-[#004242] hover:bg-[#006668] text-white px-8 h-12 rounded-md text-sm min-w-[160px] cursor-pointer"
          >
            Browse Courses
          </Button>
          <Button
            onClick={onOpenSuggestModal}
            variant="outline"
            className="border-white text-white bg-transparent hover:text-white hover:bg-white/10 px-8 h-12 rounded-md text-sm min-w-[160px] cursor-pointer"
          >
            Submit Course Idea
          </Button>
        </div>

        {/* Subtle Educational Partner Link */}
        <p className="text-xs text-gray-300 pt-1">
          Are you a university or training academy?{" "}
          <Link
            href="/educational-partners"
            className="text-white underline underline-offset-4 hover:text-[#A2E3D9] transition-colors"
          >
            Partner with us to feature your courses &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
