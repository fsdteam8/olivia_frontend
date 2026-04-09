"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PlayCircle,
  Lock,
  ChevronDown,
  Clock,
  BookOpen,
  BarChart,
  Play,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Lesson {
  _id: string;
  title: string;
  duration: string;
  level: string;
  videoUrl: string;
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

interface PlaylistSection {
  id: string;
  title: string;
  lessons: number;
  time: string;
  isLocked?: boolean;
  items?: Lesson[];
}

const CourseWatchPage = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "section-0",
  );
  const [activeLesson, setActiveLesson] = useState<string>("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["enroll-course", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${id}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch course details");
      }
      return res.json();
    },
    enabled: !!id,
  });

  const course = data?.data;

  // Transform course lessons into playlist sections
  const playlistItems: PlaylistSection[] = course
    ? [
        {
          id: "section-0",
          title: course.title,
          lessons: course.lessonCount,
          time: course.totalDuration,
          isLocked: false,
          items: course.lessons.map((lesson) => ({
            ...lesson,
            _id: lesson._id,
            title: lesson.title,
            duration: `${lesson.duration} min`,
            videoUrl: lesson.videoUrl,
          })),
        },
      ]
    : [];

  const toggleSection = (sectionId: string, isLocked?: boolean) => {
    if (isLocked) return;
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson._id);
    setIsVideoLoading(true); // Reset loading state when changing lessons
  };

  const getActiveLessonData = () => {
    if (!course) return null;
    return course.lessons.find((lesson) => lesson._id === activeLesson);
  };

  const activeLessonData = getActiveLessonData();
  const videoUrl = activeLessonData?.videoUrl;

  const getSkillLevel = () => {
    if (!course?.lessons || course.lessons.length === 0) return "Beginner";
    const levels = course.lessons.map((l) => l.level.toLowerCase());
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

  const getEmbedUrl = (url: string) => {
    // Handle different video URL formats
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Convert YouTube URL to embed format
      let videoId = "";
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes("vimeo.com")) {
      // Convert Vimeo URL to embed format
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    // Return as-is for direct video URLs or other formats
    return url;
  };

  // Set first lesson as active when data loads
  if (course && !activeLesson && course.lessons.length > 0) {
    setActiveLesson(course.lessons[0]._id);
  }

  if (error) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading course. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 p-4"
                  >
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <div className="bg-white rounded-2xl p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-gray-500">Course not found.</p>
          </div>
        </div>
      </section>
    );
  }

  const skillLevel = getSkillLevel();
  const formattedDuration = getTotalDurationInHours(course.totalDuration);
  const embedVideoUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <section className="bg-[#F8FAFA] py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#004242]">
            {course.title}
          </h1>
          <div className="text-gray-400 font-medium text-sm hidden md:block">
            {course.lessonCount} Lessons • Total {formattedDuration}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Playlist */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sticky top-32 z-40">
              {playlistItems.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleSection(section.id, section.isLocked)}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                      expandedSection === section.id
                        ? "bg-gray-50"
                        : "hover:bg-gray-50/50"
                    } ${section.isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-[#004242]">
                        01
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-[#004242] leading-tight">
                          {section.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          {section.lessons} Lessons • {section.time}
                        </p>
                      </div>
                    </div>
                    {section.isLocked ? (
                      <Lock size={16} className="text-gray-300" />
                    ) : (
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform ${
                          expandedSection === section.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {!section.isLocked &&
                    expandedSection === section.id &&
                    section.items && (
                      <div className="px-4 pb-4 space-y-1 bg-gray-50/30">
                        {section.items.map((lesson, index) => (
                          <button
                            key={lesson._id}
                            onClick={() => handleLessonClick(lesson)}
                            className={`w-full flex items-center justify-between p-2 rounded-md transition-all ${
                              activeLesson === lesson._id
                                ? "bg-[#004242]/5 text-[#004242]"
                                : "text-gray-600 hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle
                                size={18}
                                className={
                                  activeLesson === lesson._id
                                    ? "text-[#004242]"
                                    : "text-gray-300"
                                }
                              />
                              <span
                                className={`text-sm font-medium ${
                                  activeLesson === lesson._id
                                    ? "text-[#004242]"
                                    : ""
                                }`}
                              >
                                {index + 1}. {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                              {lesson.duration}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Player & Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              {embedVideoUrl ? (
                <>
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                      <div className="w-12 h-12 border-4 border-[#004242] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    src={embedVideoUrl}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsVideoLoading(false)}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <Play size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">
                      No video available for this lesson
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#004242] mb-4">
                {activeLessonData?.title || course.title}
              </h2>

              {activeLessonData?.title !== course.title && (
                <p className="text-gray-600 mb-6">
                  Currently watching: {activeLessonData?.title}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-12 pt-6 border-t">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Duration
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <Clock size={14} className="text-[#004242]" />
                    {activeLessonData?.duration || formattedDuration}
                  </div>
                </div>
                <div className="space-y-1 border-x px-12 border-gray-100">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BookOpen size={14} className="text-[#004242]" />
                    {course.lessonCount} Units
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BarChart size={14} className="text-[#004242]" />
                    {skillLevel}
                  </div>
                </div>
              </div>

              {course.totalEnrolled > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {course.totalEnrolled} student
                    {course.totalEnrolled !== 1 ? "s" : ""} enrolled
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseWatchPage;
