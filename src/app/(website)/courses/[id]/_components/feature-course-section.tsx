"use client";

import Image from "next/image";
import { Clock, BookOpen, BarChart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Lesson {
  title: string;
  duration: string;
  level: string;
  videoUrl: string;
  _id: string;
}

interface Course {
  _id: string;
  title: string;
  category: string;
  lessonCount: number;
  totalDuration: string;
  price: number;
  currency: string;
  isAvailable: boolean;
  totalEnrolled: number;
  image: {
    url: string;
    public_id: string;
  };
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Course;
}

const FeaturedCourseSection = () => {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["course-details", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${id}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch course details");
      }
      return res.json();
    },
    enabled: !!id, // Only fetch if id exists
  });

  const course = data?.data;

  const getSkillLevel = (lessons: Lesson[]) => {
    if (!lessons || lessons.length === 0) return "Beginner";
    const levels = lessons.map((l) => l.level.toLowerCase());
    if (levels.includes("advanced")) return "Advanced";
    if (levels.includes("intermediate")) return "Intermediate";
    return "Beginner";
  };

  const getTotalDurationInHours = (totalDuration: string) => {
    if (totalDuration.includes("min")) {
      const minutes = parseInt(totalDuration);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0
          ? `${hours}h ${remainingMinutes}min`
          : `${hours}h`;
      }
      return totalDuration;
    }
    return totalDuration;
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  };

  if (error) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="text-center py-16">
            <p className="text-red-500">
              Error loading course details. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#004242] hover:bg-[#003333]"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-16">
            {/* Left Content Skeleton */}
            <div className="bg-white/40 border border-white/60 rounded-2xl p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <Skeleton className="h-24 w-3/4" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-14 w-full mt-8 rounded-lg" />
            </div>

            {/* Right Image Skeleton */}
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="text-center py-16">
            <p className="text-gray-500">Course not found.</p>
          </div>
        </div>
      </section>
    );
  }

  const skillLevel = getSkillLevel(course.lessons);
  const formattedDuration = getTotalDurationInHours(course.totalDuration);
  const firstLesson = course.lessons[0];
  const videoUrl = firstLesson?.videoUrl;

  return (
    <section className="bg-[#EDF2F2]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-16">
          {/* Left Content Card */}
          <div className="bg-white/40 border border-white/60 rounded-2xl p-5 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#004242] leading-[1.1]">
                {course.title}
              </h2>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
                Master the fundamentals of {course.title.toLowerCase()}. This
                course includes {course.lessonCount} lessons with a total
                duration of {formattedDuration}. Perfect for{" "}
                {skillLevel.toLowerCase()} level learners looking to enhance
                their skills in {course.category.toLowerCase()}.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="space-y-1">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Duration
                  </p>

                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={14} className="text-[#004242]" />
                    {formattedDuration}
                  </div>
                </div>
                <div className="space-y-1 border-x border-gray-100 px-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BookOpen size={14} className="text-[#004242]" />
                    {course.lessonCount} Units
                  </div>
                </div>
                <div className="space-y-1 pl-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BarChart size={14} className="text-[#004242]" />
                    {skillLevel}
                  </div>
                </div>
              </div>

              {/* Price if available */}
              {course.price > 0 && (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#004242]">
                    {course.currency} {course.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    one-time payment
                  </span>
                </div>
              )}
            </div>

            <Link href={`/courses/${course._id}/enroll-course`}>
              <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-7 rounded-lg text-lg mt-8">
                Enroll in Course
              </Button>
            </Link>
          </div>

          {/* Right Video/Image Preview */}
          <div className="relative group bg-white p-3 rounded-2xl shadow-sm border border-white">
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-xl">
              {showVideo && videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={getImageUrl(course.image.url)}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourseSection;
