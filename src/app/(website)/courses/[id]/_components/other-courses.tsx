"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CommunitySection from "@/components/home/CommunitySection";

const otherCourses = [
  {
    id: 1,
    category: "EDUCATIONAL",
    level: "Beginner",
    duration: "4 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
  {
    id: 2,
    category: "EDUCATIONAL",
    level: "Beginner",
    duration: "4 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
  {
    id: 3,
    category: "EDUCATIONAL",
    level: "Beginner",
    duration: "4 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
];

const ExploreOtherCourses = () => {
  return (
    <section>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#004242] tracking-tight">
            Explore Other Courses
          </h2>
          <Button
            variant="outline"
            className="border-[#004242] text-[#004242] hover:bg-[#004242] hover:text-white  rounded-lg px-6"
          >
            View All Courses
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-white/95 text-black hover:bg-white border-none px-3 py-1  text-[10px] tracking-widest">
                  {course.category}
                </Badge>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-4">
                  <span className="text-[13px]  text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium">
                    <Clock size={15} className="text-[#004242]" />
                    {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-[#004242] mb-3 leading-snug">
                  {course.title}
                </h3>

                <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-3 mb-6">
                  {course.description}
                </p>

                <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg  text-sm mt-auto">
                  Explore Course
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCourses;
