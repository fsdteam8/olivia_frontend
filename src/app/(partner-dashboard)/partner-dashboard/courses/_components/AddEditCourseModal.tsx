"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  UploadCloud,
  X,
  Loader2,
  BookOpen,
  GraduationCap,
  Video,
  User,
  Sparkles,
  Clock,
  Calendar,
  DollarSign,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  PartnerCourse,
  COURSE_CATEGORIES,
  DIFFICULTY_LEVELS,
  CourseLesson,
} from "./types";

interface AddEditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit: PartnerCourse | null;
  onSaved: (course: PartnerCourse) => void;
  token?: string;
}

export default function AddEditCourseModal({
  isOpen,
  onClose,
  courseToEdit,
  onSaved,
  token,
}: AddEditCourseModalProps) {
  const isEditing = Boolean(courseToEdit);

  // SECTION 1: Course Information
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Beginner Courses");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [durationHours, setDurationHours] = useState<string>("");
  const [estimatedWeeks, setEstimatedWeeks] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [courseBoxUrl, setCourseBoxUrl] = useState("");

  // Course Thumbnail
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string>("");

  // SECTION 2: Instructor Information
  const [showInstructor, setShowInstructor] = useState(true);
  const [instructorName, setInstructorName] = useState("");
  const [instructorBio, setInstructorBio] = useState("");
  const [instructorFile, setInstructorFile] = useState<File | null>(null);
  const [existingInstructorUrl, setExistingInstructorUrl] = useState<string>("");

  // SECTION 3: Course Curriculum (Lessons)
  const [showCurriculum, setShowCurriculum] = useState(true);
  const [lessons, setLessons] = useState<CourseLesson[]>([
    { title: "", videoUrl: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form on edit
  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title || "");
      setCategory(
        courseToEdit.category ||
          (courseToEdit.categories && courseToEdit.categories[0]) ||
          "Beginner Courses"
      );
      setDifficulty(courseToEdit.difficulty || "Beginner");
      setDurationHours(
        courseToEdit.durationHours !== undefined
          ? String(courseToEdit.durationHours)
          : ""
      );
      setEstimatedWeeks(
        courseToEdit.estimatedWeeks !== undefined
          ? String(courseToEdit.estimatedWeeks)
          : ""
      );
      setPrice(
        courseToEdit.price !== undefined ? String(courseToEdit.price) : ""
      );
      setCourseBoxUrl(
        courseToEdit.courseBoxUrl || courseToEdit.enrollmentUrl || ""
      );

      const thumbUrl =
        courseToEdit.image?.url || courseToEdit.coverImage?.url || "";
      setExistingThumbnailUrl(thumbUrl);
      setShowThumbnail(true);

      setInstructorName(courseToEdit.instructorName || "");
      setInstructorBio(
        courseToEdit.instructorBio || courseToEdit.instructorDetails || ""
      );
      const instUrl = courseToEdit.instructorImage?.url || "";
      setExistingInstructorUrl(instUrl);
      setShowInstructor(
        Boolean(
          courseToEdit.instructorName || courseToEdit.instructorBio || instUrl
        )
      );

      if (courseToEdit.lessons && courseToEdit.lessons.length > 0) {
        setLessons(
          courseToEdit.lessons.map((l) => ({
            title: l.title || "",
            videoUrl: l.videoUrl || "",
          }))
        );
        setShowCurriculum(true);
      } else {
        setLessons([{ title: "", videoUrl: "" }]);
      }
    } else {
      // Reset form
      setTitle("");
      setCategory("Beginner Courses");
      setDifficulty("Beginner");
      setDurationHours("");
      setEstimatedWeeks("");
      setPrice("");
      setCourseBoxUrl("");
      setThumbnailFile(null);
      setExistingThumbnailUrl("");
      setShowThumbnail(true);

      setShowInstructor(true);
      setInstructorName("");
      setInstructorBio("");
      setInstructorFile(null);
      setExistingInstructorUrl("");

      setShowCurriculum(true);
      setLessons([{ title: "", videoUrl: "" }]);
    }
  }, [courseToEdit, isOpen]);

  // Lessons handlers
  const handleAddLesson = () => {
    setLessons((prev) => [...prev, { title: "", videoUrl: "" }]);
  };

  const handleRemoveLesson = (index: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLessonChange = (
    index: number,
    field: keyof CourseLesson,
    value: string
  ) => {
    setLessons((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a course title");
      return;
    }

    if (!category.trim()) {
      toast.error("Please select a category");
      return;
    }

    if (!durationHours.trim()) {
      toast.error("Please specify course duration in hours");
      return;
    }

    if (!estimatedWeeks.trim()) {
      toast.error("Please specify estimated course duration in weeks");
      return;
    }

    // Validate curriculum if enabled
    if (showCurriculum) {
      const emptyLesson = lessons.find(
        (l) => !l.title.trim() || !l.videoUrl.trim()
      );
      if (emptyLesson) {
        toast.error("All added lessons must have both a Title and Video URL");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const formData = new FormData();

      // Course information
      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("categories[0]", category);
      formData.append("difficulty", difficulty);
      formData.append("durationHours", durationHours);
      formData.append("estimatedWeeks", estimatedWeeks);
      if (price.trim()) {
        formData.append("price", price);
        formData.append("isFree", String(Number(price) === 0));
      } else {
        formData.append("price", "0");
        formData.append("isFree", "true");
      }
      if (courseBoxUrl.trim()) {
        formData.append("courseBoxUrl", courseBoxUrl.trim());
        formData.append("enrollmentUrl", courseBoxUrl.trim());
      }

      // Course Thumbnail
      if (showThumbnail && thumbnailFile) {
        formData.append("image", thumbnailFile);
        formData.append("coverImage", thumbnailFile);
      }

      // Instructor Information
      if (showInstructor) {
        if (instructorName.trim()) {
          formData.append("instructorName", instructorName.trim());
        }
        if (instructorBio.trim()) {
          formData.append("instructorBio", instructorBio.trim());
          formData.append("instructorDetails", instructorBio.trim());
        }
        if (instructorFile) {
          formData.append("instructorImage", instructorFile);
        }
      }

      // Lessons (Sequential)
      if (showCurriculum && lessons.length > 0) {
        formData.append("lessons", JSON.stringify(lessons));
        lessons.forEach((l, idx) => {
          formData.append(`lessons[${idx}][title]`, l.title.trim());
          formData.append(`lessons[${idx}][videoUrl]`, l.videoUrl.trim());
        });
      }

      const url = isEditing
        ? `${backendUrl}/education-partner/courses/${courseToEdit?._id}`
        : `${backendUrl}/education-partner/courses`;

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData?.message || "Failed to save course");
      }

      toast.success(
        isEditing
          ? "Course updated successfully!"
          : "Course submitted for review successfully!"
      );

      onSaved(responseData.data);
      onClose();
    } catch (err: any) {
      console.error("Course save error:", err);
      toast.error(err.message || "Failed to submit course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-5xl max-w-5xl max-h-[92vh] overflow-y-auto p-0 border border-slate-200/80 bg-white rounded-2xl shadow-2xl transition-all"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#004242]/10 text-[#004242] border border-[#004242]/20 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#004242]" />
              Education Partner Studio
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#004242] tracking-tight">
              {isEditing ? "Edit Course Offering" : "Add New Course"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs sm:text-sm text-slate-500">
              Create a new course offering and configure its syllabus lessons below.
            </DialogDescription>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 cursor-pointer shadow-2xs"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-10">
          {/* ============================================================ */}
          {/* SECTION 1: COURSE INFORMATION */}
          {/* ============================================================ */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#004242] text-white text-sm font-bold shadow-sm">
                  1
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Course Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Basic curriculum title, categorization, timing, and pricing
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Title */}
              <div className="md:col-span-2">
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-between">
                    <span>
                      Course Title <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      Clear & descriptive title
                    </span>
                  </span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Web Development Bootcamp"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                  />
                </label>
              </div>

              {/* Category */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    Category <span className="text-rose-500">*</span>
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs cursor-pointer"
                  >
                    {COURSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    Difficulty Level <span className="text-rose-500">*</span>
                  </span>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs cursor-pointer"
                  >
                    {DIFFICULTY_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Duration (Hours) */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#004242]" />
                    Duration (Hours) <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    required
                    placeholder="e.g. 40"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                  />
                </label>
              </div>

              {/* Estimated Weeks */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#004242]" />
                    Estimated Weeks <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={estimatedWeeks}
                    onChange={(e) => setEstimatedWeeks(e.target.value)}
                    required
                    placeholder="e.g. 8"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                  />
                </label>
              </div>

              {/* Price */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#004242]" />
                    Price (USD)
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 49.99 (0 for Free)"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                  />
                </label>
              </div>

              {/* Course URL */}
              <div>
                <label className="block space-y-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-[#004242]" />
                    Course URL
                  </span>
                  <input
                    type="url"
                    value={courseBoxUrl}
                    onChange={(e) => setCourseBoxUrl(e.target.value)}
                    placeholder="https://example.com/course"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                  />
                </label>
              </div>

              {/* Course Thumbnail Upload */}
              {showThumbnail ? (
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      Course Thumbnail
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setExistingThumbnailUrl("");
                        setShowThumbnail(false);
                      }}
                      className="px-2.5 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove Thumbnail
                    </button>
                  </div>

                  <div className="flex justify-center rounded-2xl border-2 border-dashed border-emerald-600/30 hover:border-emerald-600/60 bg-emerald-50/15 hover:bg-emerald-50/30 px-6 py-8 transition-all cursor-pointer relative overflow-hidden group shadow-2xs">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    />

                    {thumbnailFile || existingThumbnailUrl ? (
                      <div className="relative h-48 w-full max-w-[360px] rounded-xl overflow-hidden border border-slate-200 shadow-md">
                        <Image
                          src={
                            thumbnailFile
                              ? URL.createObjectURL(thumbnailFile)
                              : existingThumbnailUrl
                          }
                          alt="Thumbnail preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs font-bold tracking-wide">
                          Click to Change Image
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-white text-[#004242] flex items-center justify-center shadow-xs border border-emerald-100 mb-3">
                          <UploadCloud className="h-7 w-7 text-[#004242]" />
                        </div>
                        <span className="font-bold text-[#004242] text-sm">
                          Upload Course Thumbnail
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          PNG, JPG, or WEBP up to 5MB (or drag and drop here)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center">
                  <p className="mb-2 text-xs text-slate-500">
                    Course Thumbnail section removed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowThumbnail(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-[#004242] border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Course Thumbnail
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECTION 2: INSTRUCTOR INFORMATION */}
          {/* ============================================================ */}
          <div className="border-t border-slate-200/80 pt-8 space-y-6">
            {showInstructor ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#004242] text-white text-sm font-bold shadow-sm">
                      2
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Instructor Information
                      </h3>
                      <p className="text-xs text-slate-500">
                        Teacher, professor, or climate specialist credentials
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setInstructorFile(null);
                      setExistingInstructorUrl("");
                      setShowInstructor(false);
                    }}
                    className="px-2.5 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove Instructor
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block space-y-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        Instructor Full Name
                      </span>
                      <input
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        Instructor Bio
                      </span>
                      <textarea
                        value={instructorBio}
                        onChange={(e) => setInstructorBio(e.target.value)}
                        rows={4}
                        placeholder="Write a brief bio about the instructor..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all resize-none bg-white hover:border-slate-400 outline-none shadow-2xs"
                      />
                    </label>
                  </div>

                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 block mb-1.5">
                      Instructor Image
                    </span>
                    <div className="flex justify-center items-center rounded-2xl border-2 border-dashed border-emerald-600/30 hover:border-emerald-600/60 bg-emerald-50/15 hover:bg-emerald-50/30 px-6 py-6 transition-all cursor-pointer relative h-[218px] group shadow-2xs">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) =>
                          setInstructorFile(e.target.files?.[0] || null)
                        }
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                      />
                      {instructorFile || existingInstructorUrl ? (
                        <div className="relative h-36 w-36 rounded-full overflow-hidden border-3 border-[#004242]/30 shadow-md">
                          <Image
                            src={
                              instructorFile
                                ? URL.createObjectURL(instructorFile)
                                : existingInstructorUrl
                            }
                            alt="Instructor Preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all rounded-full flex items-center justify-center text-white text-xs font-bold">
                            Change Photo
                          </div>
                        </div>
                      ) : (
                        <div className="text-center flex flex-col items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-white text-[#004242] flex items-center justify-center mb-3 shadow-xs border border-emerald-100">
                            <UploadCloud className="h-8 w-8 text-[#004242]" />
                          </div>
                          <span className="text-sm font-bold text-[#004242]">
                            Upload Photo
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Click or drag photo here
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center">
                <p className="mb-2 text-xs text-slate-500">
                  Instructor Information removed.
                </p>
                <button
                  type="button"
                  onClick={() => setShowInstructor(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-[#004242] border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Instructor Information
                </button>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* SECTION 3: COURSE CURRICULUM (LESSONS) */}
          {/* ============================================================ */}
          <div className="border-t border-slate-200/80 pt-8 space-y-6">
            {showCurriculum ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#004242] text-white text-sm font-bold shadow-sm">
                      3
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Course Curriculum (Lessons)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add sequential video lessons and topic modules
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddLesson}
                      className="text-xs font-bold text-[#004242] bg-[#004242]/10 hover:bg-[#004242]/20 flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Lesson
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCurriculum(false)}
                      className="px-2.5 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-5 sm:p-6 bg-slate-50/60 hover:bg-white border border-slate-200 rounded-2xl relative transition-all shadow-2xs"
                    >
                      <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#004242] rounded-r-full" />

                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#004242]/10 text-xs font-bold text-[#004242]">
                            {index + 1}
                          </span>
                          Lesson {index + 1}
                        </h4>
                        {lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLesson(index)}
                            className="p-1.5 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove Lesson
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block space-y-1">
                            <span className="text-xs font-semibold text-slate-700">
                              Lesson Title <span className="text-rose-500">*</span>
                            </span>
                            <input
                              value={lesson.title}
                              onChange={(e) =>
                                handleLessonChange(index, "title", e.target.value)
                              }
                              placeholder="e.g. Introduction to HTML"
                              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block space-y-1">
                            <span className="text-xs font-semibold text-slate-700">
                              Video URL <span className="text-rose-500">*</span>
                            </span>
                            <input
                              type="url"
                              value={lesson.videoUrl}
                              onChange={(e) =>
                                handleLessonChange(index, "videoUrl", e.target.value)
                              }
                              placeholder="https://example.com/videos/lesson1.mp4"
                              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#004242] focus:ring-2 focus:ring-[#004242]/20 transition-all bg-white hover:border-slate-400 outline-none shadow-2xs"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center">
                <p className="mb-2 text-xs text-slate-500">
                  Course Curriculum section removed.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCurriculum(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-[#004242] border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Course Curriculum
                </button>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 -mx-6 sm:-mx-8 md:-mx-10 -mb-6 sm:-mb-8 md:-mb-10 px-6 sm:px-8 md:px-10 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold px-5 h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#004242] hover:bg-[#003030] text-white font-bold rounded-xl px-7 h-11 shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Course...
                </>
              ) : isEditing ? (
                "Update Course Offering"
              ) : (
                "Submit Course for Review"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
