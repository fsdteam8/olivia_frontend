"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  RefreshCw,
  Building2,
  MapPin,
  ExternalLink,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendationItem {
  id: string;
  title: string;
  category: "Job" | "Course" | "Fellowship" | "Event" | "Resource" | "Grant" | "Other";
  contentType: "opportunity" | "job" | "course" | "event";
  organization: string;
  location: string;
  shortDescription: string;
  link: string;
  score: number;
  matchReasons: string[];
  isPartner: boolean;
  deadline?: string;
  salaryOrPrice?: string;
  createdAt?: string;
}

interface RecommendationsApiResponse {
  success: boolean;
  data: {
    isProfileComplete: boolean;
    profileSummary: {
      name: string;
      climateJourney?: string;
      interests: string[];
      goals: string[];
      whatLooking: string[];
    };
    recommendations: RecommendationItem[];
    stats: {
      totalFound: number;
      byCategory: Record<string, number>;
    };
  };
}

const CATEGORY_TABS = [
  { id: "all", label: "All For You" },
  { id: "Job", label: "Jobs & Internships" },
  { id: "Course", label: "Courses" },
  { id: "Fellowship", label: "Fellowships" },
  { id: "Event", label: "Events" },
  { id: "Grant", label: "Grants & Funding" },
  { id: "Resource", label: "Resources" },
];

export default function PersonalizedRecommendations() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<RecommendationsApiResponse>({
      queryKey: ["personalized-recommendations", token, selectedCategory],
      queryFn: async () => {
        if (!token) {
          throw new Error("Authentication required");
        }

        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.set("category", selectedCategory);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations/my-recommendations?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Could not fetch recommendations");
        }

        return response.json();
      },
      enabled: Boolean(token),
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    });

  const payload = data?.data;
  const isProfileComplete = payload?.isProfileComplete ?? false;
  const profileSummary = payload?.profileSummary;
  const recommendations = payload?.recommendations || [];
  const stats = payload?.stats;

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 70) return "bg-[#E6F4F1] text-[#008080] border-[#BBE3DC]";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Course":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Fellowship":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Job":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Event":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Grant":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#008080] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-[#004242]">
            Personalized Opportunities For You
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Curated strictly from our platform database based on your career stage, interests, and goals.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="border-[#D5E6E4] text-[#004242] hover:bg-[#E6F4F1] rounded-xl text-xs gap-1.5 self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh Matches</span>
        </Button>
      </div>

      {/* Profile Insights Pill or Completion Alert */}
      {!isLoading && !isProfileComplete ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-900">
                Complete your Climate Survey for 100% Tailored Matches
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
                Currently showing curated recommendations. Tell us about your climate journey, interests, and career goals to get hyper-targeted course and job recommendations.
              </p>
            </div>
          </div>
          <Link href="/survey" className="shrink-0 w-full sm:w-auto">
            <Button
              size="sm"
              className="w-full sm:w-auto bg-[#004242] hover:bg-[#053535] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm"
            >
              <span>Complete Survey</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      ) : profileSummary && profileSummary.interests.length > 0 ? (
        <div className="rounded-2xl border border-[#D5E6E4] bg-[#F4F9F8] p-4 flex flex-wrap items-center gap-2 text-xs text-[#053535]">
          <span className="font-bold flex items-center gap-1.5 text-[#008080]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Context:</span>
          </span>
          {profileSummary.climateJourney && (
            <span className="px-2.5 py-0.5 rounded-md bg-white border border-[#D5E6E4] font-medium">
              Stage: {profileSummary.climateJourney}
            </span>
          )}
          {profileSummary.interests.slice(0, 3).map((interest, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md bg-white border border-[#D5E6E4] font-medium"
            >
              {interest}
            </span>
          ))}
          {profileSummary.whatLooking.slice(0, 2).map((look, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md bg-white border border-[#D5E6E4] text-[#008080] font-medium"
            >
              Looking for: {look}
            </span>
          ))}
        </div>
      ) : null}

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORY_TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? stats?.totalFound
              : stats?.byCategory?.[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-[#004242] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>{tab.label}</span>
              {typeof count === "number" && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-4/5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))
        ) : isError ? (
          <div className="col-span-full rounded-2xl bg-white border border-rose-100 p-8 text-center text-rose-600 text-sm">
            Could not load personalized recommendations at this moment. Please try refreshing.
          </div>
        ) : recommendations.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] text-[#008080] flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#004242]">
              No opportunities found in this category
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try switching tabs to view all recommendations or explore other climate career tracks.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="border-[#004242] text-[#004242] text-xs font-semibold rounded-xl"
            >
              View All Recommendations
            </Button>
          </div>
        ) : (
          recommendations.map((item) => (
            <article
              key={`${item.contentType}-${item.id}`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-[#008080]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Category Badge & AI Match Score */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryBadgeColor(
                      item.category,
                    )}`}
                  >
                    {item.category}
                  </Badge>

                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getScoreBadgeColor(
                      item.score,
                    )}`}
                  >
                    <Sparkles className="w-3 h-3 text-[#008080]" />
                    <span>{item.score}% Match</span>
                  </div>
                </div>

                {/* Match Reasons Pill */}
                {item.matchReasons.length > 0 && (
                  <div className="mb-3 p-2 rounded-lg bg-[#F4F9F8] border border-[#D5E6E4] text-[11px] text-[#053535] flex items-start gap-1.5 leading-snug">
                    <TrendingUp className="w-3.5 h-3.5 text-[#008080] shrink-0 mt-0.5" />
                    <span className="font-medium line-clamp-1">
                      {item.matchReasons[0]}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-base font-bold text-[#004242] group-hover:text-[#008080] transition-colors mb-2 line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                {/* Organization & Location */}
                <div className="space-y-1 mb-3 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5 line-clamp-1 font-medium text-gray-700">
                    <Building2 className="w-3.5 h-3.5 text-[#008080] shrink-0" />
                    <span>{item.organization}</span>
                    {item.isPartner && (
                      <span className="inline-flex items-center text-[10px] text-[#008080] font-semibold">
                        • Partner
                      </span>
                    )}
                  </p>
                  <p className="flex items-center gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-[#008080] shrink-0" />
                    <span>{item.location || "Remote"}</span>
                  </p>
                  {item.salaryOrPrice && (
                    <p className="flex items-center gap-1.5 line-clamp-1 text-emerald-700 font-medium">
                      <DollarSign className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.salaryOrPrice}</span>
                    </p>
                  )}
                  {item.deadline && (
                    <p className="flex items-center gap-1.5 line-clamp-1 text-amber-700">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Deadline:{" "}
                        {new Date(item.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                  {item.shortDescription}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-100 mt-auto">
                {item.link.startsWith("http") ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-[#004242] hover:bg-[#053535] text-white py-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>
                        {item.isPartner
                          ? "Apply on Partner Portal"
                          : "View Opportunity"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                ) : (
                  <Link href={item.link} className="block w-full">
                    <Button
                      size="sm"
                      className="w-full bg-[#004242] hover:bg-[#053535] text-white py-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

