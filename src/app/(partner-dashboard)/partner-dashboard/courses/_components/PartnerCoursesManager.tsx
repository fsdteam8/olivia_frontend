"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  DollarSign,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  PartnerCourse,
  PartnerCoursesMeta,
  STATUS_CONFIG,
  FORMAT_OPTIONS,
  StripeConnectStatus,
} from "./types";
import AddEditCourseModal from "./AddEditCourseModal";
import ViewCourseModal from "./ViewCourseModal";
import DeleteCourseDialog from "./DeleteCourseDialog";
import StripeConnectModal from "@/app/(partner-dashboard)/_components/StripeConnectModal";
import { fetchStripeStatus, fetchStripeDashboardLink } from "@/app/(partner-dashboard)/_lib/stripeConnect";
import { CreditCard, AlertTriangle, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

interface PartnerCoursesManagerProps {
  showHeader?: boolean;
}

export default function PartnerCoursesManager({
  showHeader = true,
}: PartnerCoursesManagerProps) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // Courses state
  const [courses, setCourses] = useState<PartnerCourse[]>([]);
  const [meta, setMeta] = useState<PartnerCoursesMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<PartnerCourse | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourseForView, setSelectedCourseForView] = useState<PartnerCourse | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<PartnerCourse | null>(null);

  // Stripe Connect State
  const [stripeStatus, setStripeStatus] = useState<StripeConnectStatus | null>(null);
  const [isCheckingStripe, setIsCheckingStripe] = useState(true);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isLoadingDashboardLink, setIsLoadingDashboardLink] = useState(false);

  const loadStripeStatus = useCallback(async () => {
    if (!token) return;
    try {
      setIsCheckingStripe(true);
      const status = await fetchStripeStatus(token);
      setStripeStatus(status);
    } catch (e) {
      console.error("Error loading stripe status:", e);
    } finally {
      setIsCheckingStripe(false);
    }
  }, [token]);

  useEffect(() => {
    if (session) {
      loadStripeStatus();
    }
  }, [session, loadStripeStatus]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const stripeParam = urlParams.get("stripe");
      if (stripeParam === "success" || stripeParam === "return") {
        toast.success("Stripe Connect status updated!");
        loadStripeStatus();
      } else if (stripeParam === "refresh") {
        toast.info("Stripe verification can be resumed anytime.");
      }
    }
  }, [loadStripeStatus]);

  const isStripeOnboarded = Boolean(
    stripeStatus?.connected &&
      (stripeStatus.status === "active" ||
        stripeStatus.payoutsEnabled ||
        stripeStatus.detailsSubmitted)
  );

  const handleOpenStripeDashboard = async () => {
    try {
      setIsLoadingDashboardLink(true);
      const url = await fetchStripeDashboardLink(token);
      if (url) {
        window.open(url, "_blank");
      } else {
        toast.error("Could not generate Stripe Dashboard link.");
      }
    } catch {
      toast.error("Failed to open Stripe Dashboard");
    } finally {
      setIsLoadingDashboardLink(false);
    }
  };

  // Fetch Courses Function
  const fetchCourses = useCallback(
    async (page = currentPage, search = activeSearch, status = statusFilter) => {
      try {
        setIsLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const queryParams = new URLSearchParams();
        queryParams.set("page", String(page));
        queryParams.set("limit", "10");

        if (search.trim()) {
          queryParams.set("search", search.trim());
        }

        if (status && status !== "all") {
          queryParams.set("status", status);
        }

        const res = await fetch(
          `${backendUrl}/education-partner/courses/my-courses?${queryParams.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const data = await res.json();

        if (res.ok && data?.data) {
          setCourses(data.data);
          if (data.meta) {
            setMeta(data.meta);
          }
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch partner courses:", err);
        toast.error("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, activeSearch, statusFilter, token]
  );

  useEffect(() => {
    if (session) {
      fetchCourses(currentPage, activeSearch, statusFilter);
    }
  }, [session, currentPage, activeSearch, statusFilter, fetchCourses]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setActiveSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handleOpenAddModal = () => {
    if (!isStripeOnboarded) {
      toast.warning("Stripe Connect onboarding is required before you can create courses.");
      setIsStripeModalOpen(true);
      return;
    }
    setCourseToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (course: PartnerCourse) => {
    setCourseToEdit(course);
    setIsAddEditModalOpen(true);
  };

  const handleOpenViewModal = (course: PartnerCourse) => {
    setSelectedCourseForView(course);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteDialog = (course: PartnerCourse) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const handleCourseSaved = () => {
    fetchCourses(currentPage, activeSearch, statusFilter);
  };

  const handleCourseDeleted = (deletedCourseId: string) => {
    setCourses((prev) => prev.filter((c) => c._id !== deletedCourseId));
    fetchCourses(currentPage, activeSearch, statusFilter);
  };

  const approvedCount = courses.filter((c) => c.status === "approved").length;
  const underReviewCount = courses.filter((c) => c.status === "submitted").length;

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#181919] tracking-tight">
              Courses & Programs
            </h2>
            <p className="text-sm text-[#6c6c6c] mt-0.5">
              Dashboard &gt; Partner Portal &gt; My Courses
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            {isStripeOnboarded ? (
              <Button
                variant="outline"
                onClick={handleOpenStripeDashboard}
                disabled={isLoadingDashboardLink}
                className="rounded-xl border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs h-11 px-4 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                {isLoadingDashboardLink ? "Opening..." : "Stripe Connected"}
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsStripeModalOpen(true)}
                className="rounded-xl border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100 font-bold text-xs h-11 px-4 shadow-2xs"
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                Connect Stripe
              </Button>
            )}

            <Button
              onClick={handleOpenAddModal}
              className="bg-[#004242] hover:bg-[#003333] text-white font-bold px-5 h-11 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              {isStripeOnboarded ? (
                <Plus className="w-4 h-4" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>Add New Course</span>
            </Button>
          </div>
        </div>
      )}

      {/* STRIPE NOT CONNECTED ALERT BANNER */}
      {!isStripeOnboarded && !isCheckingStripe && (
        <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-orange-50 border border-amber-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <CreditCard className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Action Required
                </span>
                <h4 className="text-sm font-bold text-amber-950">
                  Connect Stripe Payout Account to Publish Courses
                </h4>
              </div>
              <p className="text-xs text-amber-900/80 mt-1 max-w-2xl leading-relaxed">
                Before uploading or publishing courses on Act on Climate, your institution must complete Stripe Connect verification. This allows student tuition to be paid directly into your bank with 0% platform commission.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsStripeModalOpen(true)}
            className="bg-[#004242] hover:bg-[#003030] text-white font-bold text-xs rounded-xl px-5 py-2.5 shrink-0 shadow-sm flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Connect Stripe Now</span>
          </Button>
        </div>
      )}

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Total Listed Courses
            </span>
            <span className="text-2xl font-bold text-[#181919]">
              {meta.total || courses.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Active / Approved
            </span>
            <span className="text-2xl font-bold text-emerald-700">
              {approvedCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Under Review
            </span>
            <span className="text-2xl font-bold text-amber-700">
              {underReviewCount}
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#d8dfdf] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 flex-1 max-w-lg"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by course title, topics, or summary..."
                className="pl-9 pr-9 h-11 rounded-xl text-sm border-gray-200"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setActiveSearch("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="bg-[#004242] hover:bg-[#003333] text-white font-semibold px-4 h-11 rounded-xl"
            >
              Search
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="w-44">
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-11 rounded-xl text-xs font-semibold">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="submitted">Under Review</SelectItem>
                  <SelectItem value="revision_requested">Revision Requested</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(activeSearch || statusFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-11 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 border-dashed"
              >
                Reset
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => fetchCourses(currentPage, activeSearch, statusFilter)}
              disabled={isLoading}
              title="Refresh Courses"
              className="h-11 w-11 rounded-xl border-gray-200 text-gray-600 hover:text-[#004242]"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>

            {!showHeader && (
              <Button
                onClick={handleOpenAddModal}
                className="bg-[#004242] hover:bg-[#003333] text-white font-bold px-4 h-11 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Course</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* COURSES TABLE */}
      <div className="bg-white rounded-xl border border-[#d8dfdf] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#d8dfdf] bg-[#fbfcfc]">
                <th className="px-5 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category & Duration
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Difficulty & Lessons
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                  Price
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-5 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#d8dfdf]">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                          <div className="h-3 bg-gray-100 rounded-md w-1/2" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded-md w-24" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded-md w-28" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 bg-gray-200 rounded-md w-16 mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 bg-gray-200 rounded-md w-16 mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-5 bg-gray-200 rounded-full w-20 mx-auto" />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="h-6 bg-gray-200 rounded-md w-20 mx-auto" />
                    </td>
                  </tr>
                ))
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#004242]/10 text-[#004242] flex items-center justify-center mx-auto">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        No course offerings found
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {activeSearch || statusFilter !== "all"
                          ? "No courses matched your current filter criteria. Try resetting your search."
                          : "You haven't submitted any courses yet. Add your first climate course to appear in the directory."}
                      </p>
                      <div className="pt-2">
                        {activeSearch || statusFilter !== "all" ? (
                          <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="rounded-xl font-bold"
                          >
                            Clear Filters
                          </Button>
                        ) : (
                          <Button
                            onClick={handleOpenAddModal}
                            className="bg-[#004242] hover:bg-[#003333] text-white font-bold rounded-xl px-5"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Your First Course
                          </Button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                courses.map((course) => {
                  const statusConfig =
                    STATUS_CONFIG[course.status] || STATUS_CONFIG.draft;
                  const formatLabel =
                    FORMAT_OPTIONS.find((f: { label: string; value: string }) => f.value === course.format)
                      ?.label || course.format;
                  const coverUrl =
                    course.coverImage?.url || course.image?.url;

                  return (
                    <tr
                      key={course._id}
                      className="hover:bg-[#fbfcfc] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          {coverUrl ? (
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-slate-900">
                              <Image
                                src={coverUrl}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center shrink-0 font-bold">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0 max-w-sm">
                            <h4
                              onClick={() => handleOpenViewModal(course)}
                              className="text-sm font-bold text-gray-900 hover:text-[#004242] cursor-pointer truncate transition"
                              title={course.title}
                            >
                              {course.title}
                            </h4>
                            <p
                              className="text-xs text-gray-500 line-clamp-1 mt-0.5"
                              title={course.summary}
                            >
                              {course.summary || course.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-gray-800 block">
                          {course.category || (course.categories && course.categories[0]) || "Educational Courses"}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {course.durationHours ? `${course.durationHours} hrs` : course.duration || "N/A"}{" "}
                          {course.estimatedWeeks ? `(${course.estimatedWeeks} wks)` : ""}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                          {course.difficulty || "Beginner"}
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-1">
                          {course.lessons?.length || 0} Lessons
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        {course.isFree || !course.price ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Free
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">
                            ${course.price}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-800 block truncate max-w-[140px]">
                          {course.instructorName || "Not set"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          {statusConfig.label}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenViewModal(course)}
                            title="View Course Details"
                            className="p-1.5 text-gray-500 hover:text-[#004242] hover:bg-[#004242]/10 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(course)}
                            title="Edit Course"
                            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenDeleteDialog(course)}
                            title="Delete Course"
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {meta.totalPage > 1 && (
          <div className="p-4 md:p-5 border-t border-[#d8dfdf] bg-[#fbfcfc] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div>
              Showing page <span className="font-bold">{meta.page}</span> of{" "}
              <span className="font-bold">{meta.totalPage}</span> (
              <span className="font-bold">{meta.total}</span> courses total)
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1 || isLoading}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="h-8 rounded-lg text-xs font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
              </Button>

              {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(meta.totalPage, currentPage + 2)
                )
                .map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 p-0 rounded-lg text-xs font-bold ${
                      currentPage === pageNum
                        ? "bg-[#004242] text-white hover:bg-[#003333]"
                        : "text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= meta.totalPage || isLoading}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, meta.totalPage))
                }
                className="h-8 rounded-lg text-xs font-semibold"
              >
                Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD & EDIT COURSE MODAL */}
      <AddEditCourseModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setCourseToEdit(null);
        }}
        courseToEdit={courseToEdit}
        onSaved={handleCourseSaved}
        token={token}
      />

      {/* MODAL 2: VIEW COURSE DETAILS MODAL */}
      <ViewCourseModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCourseForView(null);
        }}
        course={selectedCourseForView}
        onEdit={(c: PartnerCourse) => {
          handleOpenEditModal(c);
        }}
        token={token}
      />

      {/* MODAL 3: DELETE CONFIRMATION DIALOG */}
      <DeleteCourseDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCourseToDelete(null);
        }}
        course={courseToDelete}
        onDeleted={handleCourseDeleted}
        token={token}
      />

      {/* MODAL 4: STRIPE CONNECT ONBOARDING MODAL */}
      <StripeConnectModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        token={token}
        onSuccess={() => loadStripeStatus()}
      />
    </div>
  );
}
