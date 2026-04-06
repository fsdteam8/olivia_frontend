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

const playlistItems = [
  {
    id: "01",
    title: "Introduction to Carbon Markets",
    lessons: 6,
    time: "2h 45m",
    items: [
      { id: "v1", title: "Climate Economics 101", duration: "25:00" },
      { id: "v2", title: "Cap and Trade vs. Carbon Taxes", duration: "25:00" },
    ],
  },
  {
    id: "02",
    title: "Carbon Pricing Models",
    lessons: 6,
    time: "2h 45m",
    isLocked: true,
  },
  {
    id: "03",
    title: "Baseline-and-Credit Mechanisms",
    lessons: 6,
    time: "2h 45m",
    isLocked: true,
  },
  {
    id: "04",
    title: "Advanced Carbon Accounting",
    lessons: 5,
    time: "3h 30m",
    isLocked: true,
  },
];

const CourseWatchPage = () => {
  // State for Accordion
  const [expandedSection, setExpandedSection] = useState<string | null>("01");
  // State for Active Lesson
  const [activeLesson, setActiveLesson] = useState("v1");

  const toggleSection = (id: string, isLocked?: boolean) => {
    if (isLocked) return;
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <section className="bg-[#F8FAFA] py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl  text-[#004242]">
            Introduction to Carbon Markets
          </h1>
          <div className="text-gray-400 font-medium text-sm hidden md:block">
            12 Lessons • Total 6h 15m
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Playlist */}
          <div className="lg:col-span-4 ">
            <div className="space-y-3 sticky top-32 z-40">
              {playlistItems.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id, section.isLocked)}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                      expandedSection === section.id
                        ? "bg-gray-50"
                        : "hover:bg-gray-50/50"
                    } ${section.isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl  text-[#004242]">
                        {section.id}
                      </span>
                      <div>
                        <h4 className="text-sm  text-[#004242] leading-tight">
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
                        className={`text-gray-400 transition-transform ${expandedSection === section.id ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {/* Section Lessons */}
                  {!section.isLocked &&
                    expandedSection === section.id &&
                    section.items && (
                      <div className="px-4 pb-4 space-y-1 bg-gray-50/30">
                        {section.items.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-md transition-all ${
                              activeLesson === lesson.id
                                ? "bg-[#004242]/5 text-[#004242]"
                                : "text-gray-600 hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle
                                size={18}
                                className={
                                  activeLesson === lesson.id
                                    ? "text-[#004242]"
                                    : "text-gray-300"
                                }
                              />
                              <span
                                className={`text-sm font-medium ${activeLesson === lesson.id ? "" : ""}`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-blue-400 font-medium">
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
            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/course-preview.jpg"
                alt="Video thumbnail"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-[#004242] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group-active:scale-95">
                  <Play size={24} fill="white" className="text-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#004242] w-1/4 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-3xl  text-[#004242] mb-4">
                Sustainable Energy Transition
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#004242]">
                  <Image
                    src="/instructor.jpg"
                    alt="Instructor"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm  text-[#004242]">
                  Taught by Dr. Sarah Chen
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-12 pt-6 border-t">
                <div className="space-y-1">
                  <p className="text-xs  text-[#004242] uppercase tracking-wider">
                    Duration
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <Clock size={14} className="text-[#004242]" /> 12 Hours
                  </div>
                </div>
                <div className="space-y-1 border-x px-12 border-gray-100">
                  <p className="text-xs  text-[#004242] uppercase tracking-wider">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BookOpen size={14} className="text-[#004242]" /> 24 Units
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs  text-[#004242] uppercase tracking-wider">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BarChart size={14} className="text-[#004242]" />{" "}
                    Intermediate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseWatchPage;
