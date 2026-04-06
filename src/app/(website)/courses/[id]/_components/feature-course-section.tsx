"use client";

import Image from "next/image";
import { Clock, BookOpen, BarChart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedCourseSection = () => {
  return (
    <section className="bg-[#EDF2F2]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-16">
          {/* Left Content Card */}
          <div className="bg-white/40 border border-white/60 rounded-2xl p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#004242] leading-[1.1]">
                Sustainable <br /> Energy Transition
              </h2>

              {/* Instructor Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#004242]">
                  <Image
                    src="/instructor-avatar.jpg" // Replace with your path
                    alt="Dr. Sarah Chen"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[#004242]  text-sm">
                  Taught by Dr. Sarah Chen, Climate Policy Expert
                </p>
              </div>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
                Master the fundamentals of renewable energy systems and lead the
                global shift towards a carbon-neutral future. Learn policy
                frameworks, technology trends, and implementation strategies
                from industry veterans.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="space-y-1">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Duration
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={14} className="text-[#004242]" />
                    12 Hours
                  </div>
                </div>
                <div className="space-y-1 border-x border-gray-100 px-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BookOpen size={14} className="text-[#004242]" />
                    24 Units
                  </div>
                </div>
                <div className="space-y-1 pl-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BarChart size={14} className="text-[#004242]" />
                    Intermediate
                  </div>
                </div>
              </div>
            </div>

            <Link href={`/courses/adfasdfasf/enroll-course`}>
              <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-7 rounded-lg  text-lg mt-8">
                Enroll in Course
              </Button>
            </Link>
          </div>

          {/* Right Video/Image Preview */}
          <div className="relative group bg-white p-3 rounded-2xl shadow-sm border border-white">
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src="/collaborate-image.jpg" // Replace with your image path
                alt="Course Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with Play Button */}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <button className="w-20 h-20 bg-[#004242] text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl border-4 border-white/20">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourseSection;
