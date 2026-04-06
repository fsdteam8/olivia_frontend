"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const categories = [
  "All Courses",
  "Beginner Courses",
  "Professional Development Courses",
  "Business Courses",
  "Educational Courses",
  "Insight Courses",
];

const courses = [
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
    level: "Intermediate",
    duration: "6 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
  {
    id: 3,
    category: "EDUCATIONAL",
    level: "Advanced",
    duration: "8 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
  {
    id: 4,
    category: "EDUCATIONAL",
    level: "Intermediate",
    duration: "5 weeks",
    title: "Introduction to Climate Policy",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "/courses-bg.jpg",
  },
  {
    id: 5,
    category: "EDUCATIONAL",
    level: "Advanced",
    duration: "1 weeks",
    title: "Climate Change Mitigation Strat...",
    description: "30% reduction in energy costs through renewable solutions",
    image: "/courses-bg.jpg",
  },
  {
    id: 6,
    category: "EDUCATIONAL",
    level: "Beginner",
    duration: "2 weeks",
    title: "Sustainable Development Goals...",
    description:
      "25% increase in community engagement for sustainability projects",
    image: "/courses-bg.jpg",
  },
];

const CourseListSection = () => {
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`,
      );
    },
  });

  return (
    <section>
      <div className="container">
        {/* Filter Bar & Newsletter Subscription */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-5 gap-5">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <Button
                key={cat}
                variant="ghost"
                className={`h-10 px-5 rounded-md text-sm  hero-font ${
                  index === 0
                    ? "bg-[#004242] text-white hover:bg-[#003333] hover:text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border-none shadow-sm"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="border-none focus-visible:ring-0 w-64 h-11 text-sm px-4"
            />
            <Button className="bg-[#004242] hover:bg-[#003333] text-white h-11 px-6 rounded-none  hero-font">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Card Header Image */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-white/95 text-black hover:bg-white border-none px-3 py-1  text-[10px] tracking-widest shadow-sm">
                  {course.category}
                </Badge>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-4">
                  <span
                    className={`text-[13px]  ${
                      course.level === "Beginner"
                        ? "text-green-500"
                        : course.level === "Intermediate"
                          ? "text-blue-500"
                          : "text-purple-500"
                    }`}
                  >
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

                <Link href={`/courses/adfasdfasf`}>
                  <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg  text-sm mt-auto">
                    Explore Course
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="border-none hover:bg-gray-100"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none "
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="border-none hover:bg-gray-100"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="border-none hover:bg-gray-100"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="border-none hover:bg-gray-100"
                >
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="border-none hover:bg-gray-100"
                >
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="border-none hover:bg-gray-100"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default CourseListSection;
