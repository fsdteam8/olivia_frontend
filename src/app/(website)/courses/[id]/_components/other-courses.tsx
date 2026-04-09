"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
  lessons: Array<{
    title: string;
    duration: string;
    level: string;
    videoUrl: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Course[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full">
    <div className="relative aspect-[16/10] w-full">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-5 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

const ExploreOtherCourses = () => {
  const { id } = useParams();
  const currentCourseId = id as string;

  // Fetch other courses (excluding current course)
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["other-courses", currentCourseId],
    queryFn: async () => {
      // Fetch more courses than needed to ensure we have enough after filtering
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all?limit=10`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  // Filter out the current course and take first 3
  const otherCourses =
    data?.data
      ?.filter((course) => course._id !== currentCourseId)
      ?.slice(0, 3) || [];

  const getLevelFromLessons = (lessons: Course["lessons"]) => {
    if (!lessons || lessons.length === 0) return "Beginner";
    const levels = lessons.map((l) => l.level.toLowerCase());
    if (levels.includes("advanced")) return "Advanced";
    if (levels.includes("intermediate")) return "Intermediate";
    return "Beginner";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-500 bg-green-50";
      case "Intermediate":
        return "text-blue-500 bg-blue-50";
      case "Advanced":
        return "text-purple-500 bg-purple-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  };

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading other courses. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="flex items-center justify-between mb-10">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-36" />
          </div>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CourseCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (otherCourses.length === 0) {
    return null; // Don't show section if no other courses
  }

  return (
    <section>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#004242] tracking-tight">
            Explore Other Courses
          </h2>
          <Link href="/courses">
            <Button
              variant="outline"
              className="border-[#004242] text-[#004242] hover:bg-[#004242] hover:text-white rounded-lg px-6"
            >
              View All Courses
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCourses.map((course) => {
            const level = getLevelFromLessons(course.lessons);
            const levelColor = getLevelColor(level);

            return (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={getImageUrl(course.image.url)}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/95 text-black hover:bg-white border-none px-3 py-1 text-[10px] tracking-widest shadow-sm">
                    {course.category}
                  </Badge>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-5 mb-4">
                    <span
                      className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${levelColor}`}
                    >
                      {level}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium">
                      <Clock size={15} className="text-[#004242]" />
                      {course.totalDuration}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#004242] mb-3 leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-4">
                    {course.lessonCount} lessons • {course.totalEnrolled}{" "}
                    enrolled
                  </p>

                  {course.price > 0 && (
                    <p className="text-[#004242] font-bold text-lg mb-4">
                      {course.currency} {course.price}
                    </p>
                  )}

                  <Link href={`/courses/${course._id}`}>
                    <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg text-sm mt-auto transition-colors">
                      Explore Course
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCourses;
