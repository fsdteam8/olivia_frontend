"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Pencil,
  Clock,
  Calendar,
  DollarSign,
  GraduationCap,
  Video,
  User,
  BookOpen,
  Award,
  Loader2,
  X,
} from "lucide-react";
import { PartnerCourse, STATUS_CONFIG } from "./types";

interface ViewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: PartnerCourse | null;
  onEdit: (course: PartnerCourse) => void;
  token?: string;
}

export default function ViewCourseModal({
  isOpen,
  onClose,
  course: initialCourse,
  onEdit,
  token,
}: ViewCourseModalProps) {
  const [course, setCourse] = useState<PartnerCourse | null>(initialCourse);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCourse(initialCourse);

    if (isOpen && initialCourse?._id) {
      const fetchDetails = async () => {
        try {
          setIsLoading(true);
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          const res = await fetch(
            `${backendUrl}/education-partner/courses/${initialCourse._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );
          const data = await res.json();
          if (res.ok && data?.data) {
            setCourse(data.data);
          }
        } catch (err) {
          console.error("Failed to fetch fresh course details:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetails();
    }
  }, [isOpen, initialCourse, token]);

  if (!course) return null;

  const statusInfo = STATUS_CONFIG[course.status] || STATUS_CONFIG.draft;
  const coverUrl = course.image?.url || course.coverImage?.url;
  const instructorImg = course.instructorImage?.url;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] sm:max-w-4xl md:max-w-5xl max-w-5xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl bg-white border border-slate-200 shadow-2xl"
      >
        {/* Cover / Header */}
        {coverUrl ? (
          <div className="relative w-full h-56 bg-slate-900 overflow-hidden rounded-t-2xl">
            <Image
              src={coverUrl}
              alt={course.title}
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                >
                  {statusInfo.label}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-2 drop-shadow-sm">
                  {course.title}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#004242] p-6 text-white rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {course.title}
            </h2>
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-2 text-xs text-[#004242]">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Refreshing course details...</span>
            </div>
          )}

          {/* Section 1: Course Info KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#f8fafc] border border-gray-100 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Category
              </span>
              <span className="text-sm font-bold text-gray-900 block truncate mt-0.5">
                {course.category || (course.categories && course.categories[0]) || "General"}
              </span>
            </div>

            <div className="bg-[#f8fafc] border border-gray-100 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Difficulty
              </span>
              <span className="text-sm font-bold text-gray-900 block truncate mt-0.5">
                {course.difficulty || "Beginner"}
              </span>
            </div>

            <div className="bg-[#f8fafc] border border-gray-100 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Duration / Weeks
              </span>
              <span className="text-sm font-bold text-gray-900 block truncate mt-0.5">
                {course.durationHours ? `${course.durationHours} hrs` : course.duration || "N/A"}{" "}
                {course.estimatedWeeks ? `(${course.estimatedWeeks} wks)` : ""}
              </span>
            </div>

            <div className="bg-[#f8fafc] border border-gray-100 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Price
              </span>
              <span className="text-sm font-bold text-emerald-700 block truncate mt-0.5">
                {course.isFree || !course.price
                  ? "Free"
                  : `$${course.price}`}
              </span>
            </div>
          </div>

          {/* Course URL Link */}
          {(course.courseBoxUrl || course.enrollmentUrl) && (
            <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 truncate mr-2">
                Course URL: {course.courseBoxUrl || course.enrollmentUrl}
              </span>
              <a
                href={course.courseBoxUrl || course.enrollmentUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-xs font-bold text-[#004242] hover:underline inline-flex items-center gap-1"
              >
                Visit <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Section 2: Instructor Information */}
          {(course.instructorName || course.instructorBio || course.instructorDetails || instructorImg) && (
            <div className="border border-gray-200 rounded-xl p-5 bg-[#fbfdfd]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">
                Instructor Information
              </span>
              <div className="flex items-start gap-4">
                {instructorImg ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#004242]/20 shrink-0">
                    <Image
                      src={instructorImg}
                      alt={course.instructorName || "Instructor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold text-xl shrink-0">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    {course.instructorName || "Assigned Instructor"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    {course.instructorBio || course.instructorDetails || "No bio provided."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Course Curriculum (Lessons) */}
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#004242]" /> Course Curriculum ({course.lessons?.length || 0} Lessons)
            </span>
            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-2.5">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-gray-100 bg-[#f8fafc] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004242]/10 text-[11px] font-bold text-[#004242] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {lesson.title || `Lesson ${idx + 1}`}
                      </span>
                    </div>

                    {lesson.videoUrl && (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-[#004242] hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        Watch Video <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-500">
                No lessons added yet.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex items-center justify-between rounded-b-2xl">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-gray-200 text-gray-600"
          >
            Close
          </Button>

          <Button
            onClick={() => {
              onClose();
              onEdit(course);
            }}
            className="bg-[#004242] hover:bg-[#003030] text-white font-bold rounded-xl"
          >
            <Pencil className="w-4 h-4 mr-1.5" /> Edit Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
