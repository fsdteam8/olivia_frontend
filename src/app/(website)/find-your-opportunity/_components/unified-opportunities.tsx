"use client";

import React, {
  useState,
  useDeferredValue,
  useEffect,
  useTransition,
} from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  MapPin,
  ExternalLink,
  Sparkles,
  Calendar,
  GraduationCap,
  Briefcase,
  Layers,
  X,
  PlusCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface OpportunityItem {
  _id: string;
  title: string;
  organizationName: string;
  opportunityType: string;
  location: string;
  officialLink: string;
  shortDescription: string;
  isPartnerOpportunity?: boolean;
  partnerId?: {
    _id?: string;
    organizationName?: string;
    membershipStatus?: string;
    isVerifiedPartner?: boolean;
    organizationType?: string;
    slug?: string;
  };
  createdAt: string;
}

export interface UnifiedOpportunitiesResponse {
  success?: boolean;
  data: OpportunityItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const CATEGORY_TABS = [
  { label: "All Opportunities", value: "All" },
  { label: "Jobs", value: "Job" },
  { label: "Fellowships", value: "Fellowship" },
  { label: "Courses", value: "courses" },
  { label: "Events", value: "events" },
  { label: "Internships", value: "Internship" },
  { label: "Resources", value: "Resource" },
  { label: "Grants & Fundraising", value: "grants,fundraising" },
];

const SOURCE_FILTERS = [
  { label: "All Sources", value: "all" },
  { label: "Verified Partners", value: "partner" },
  { label: "Curated", value: "curated" },
];

const CardSkeleton = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-3" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <Skeleton className="h-14 w-full rounded-lg" />
    </div>
    <div className="pt-6 border-t border-slate-50 mt-6">
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

export default function UnifiedOpportunities() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSource, setSelectedSource] = useState<"all" | "partner" | "curated">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDeferredValue(searchTerm);
  const [, startTransition] = useTransition();

  const { data, isLoading, isError } = useQuery<UnifiedOpportunitiesResponse>({
    queryKey: [
      "unified-opportunities",
      currentPage,
      selectedCategory,
      selectedSource,
      debouncedSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: "9",
      });

      if (selectedCategory !== "All") {
        params.set("opportunityType", selectedCategory);
      }

      if (selectedSource !== "all") {
        params.set("source", selectedSource);
      }

      if (debouncedSearch.trim()) {
        params.set("search", debouncedSearch.trim());
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opportunity/published?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch opportunities");
      }

      return response.json();
    },
  });

  // Reset page to 1 whenever filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [selectedCategory, selectedSource, debouncedSearch]);

  const opportunities = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;
  const totalCount = meta?.total || 0;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently added";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryBadgeStyle = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("course")) return "bg-[#E6F4F1] text-[#008080] border-[#BBE3DC]";
    if (t.includes("fellowship")) return "bg-purple-50 text-purple-700 border-purple-100";
    if (t.includes("job")) return "bg-blue-50 text-blue-700 border-blue-100";
    if (t.includes("internship")) return "bg-sky-50 text-sky-700 border-sky-100";
    if (t.includes("event")) return "bg-amber-50 text-amber-700 border-amber-100";
    if (t.includes("grant") || t.includes("fund"))
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const formatCategoryLabel = (type: string) => {
    const t = type.toLowerCase();
    if (t === "courses") return "Course";
    if (t === "events") return "Event";
    if (t === "grants") return "Grant";
    if (t === "fundraising") return "Fundraising";
    return type;
  };

  return (
    <section id="opportunities-hub" className="py-12 sm:py-16 bg-[#FAFCFC] border-y border-[#E3ECEC]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#008080]" />
            <span>Unified Opportunities Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#004D4D] hero-font font-bold mb-3 tracking-tight">
            Climate Opportunities &amp; Programs
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Real-time feed of climate courses, fellowships, jobs, events, and grants submitted by verified educational partners and curated by Act on Climate.
          </p>
        </div>

        {/* Search & Source Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E3ECEC] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, organization, or location..."
                className="pl-10 h-11 rounded-xl border-[#D5E6E4] bg-white text-sm focus-visible:ring-[#004D4D]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Source Segmented Control (All / Partner / Curated) */}
            <div className="flex items-center bg-[#F2F8F7] p-1 rounded-xl border border-[#D5E6E4] self-start md:self-auto shrink-0">
              {SOURCE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    setSelectedSource(filter.value as "all" | "partner" | "curated")
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedSource === filter.value
                      ? "bg-[#004D4D] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#004D4D]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-hide border-t border-slate-100">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-[#004D4D] text-white shadow-sm"
                    : "bg-[#F4F9F8] text-slate-600 hover:bg-[#EAF3F2] border border-[#E3ECEC]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Contribution Banner Strip */}
        <div className="mb-8 rounded-2xl bg-[#E6F4F1] border border-[#BBE3DC] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#004D4D] text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#053535]">
                Are you an Educational Partner or Organization?
              </h4>
              <p className="text-xs text-[#527977]">
                Submit your climate curriculum, degree, or workshop to reach over 25,000 active learners.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/partner-dashboard/opportunities">
              <Button
                size="sm"
                className="bg-[#053535] hover:bg-[#084848] text-white text-xs rounded-lg font-semibold px-4 gap-1.5 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Partner Submission</span>
              </Button>
            </Link>
            <a href="#contribute-to-climate">
              <Button
                variant="outline"
                size="sm"
                className="border-[#053535] text-[#053535] hover:bg-white text-xs rounded-lg font-semibold px-4"
              >
                Community Submit
              </Button>
            </a>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-[#004D4D]">{opportunities.length}</strong> of{" "}
            <strong className="text-[#004D4D]">{totalCount}</strong> opportunities
          </span>
          {selectedCategory !== "All" && (
            <span className="font-medium text-[#008080]">
              Filtered by: {CATEGORY_TABS.find((c) => c.value === selectedCategory)?.label}
            </span>
          )}
        </div>

        {/* Unified Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => <CardSkeleton key={idx} />)
          ) : isError ? (
            <div className="col-span-full rounded-2xl bg-white border border-rose-100 p-12 text-center text-rose-600">
              Opportunities could not be loaded at this moment. Please refresh the page.
            </div>
          ) : opportunities.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-[#D5E6E4] p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F4F1] text-[#008080] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#053535]">No opportunities found</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                We couldn&apos;t find any opportunities matching your active filters or search terms. Try clearing search or selecting a different category.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedSource("all");
                }}
                className="text-xs border-[#004D4D] text-[#004D4D] hover:bg-[#E6F4F1] rounded-xl font-semibold px-5"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            opportunities.map((opp) => {
              const isPartner =
                opp.isPartnerOpportunity ||
                Boolean(opp.partnerId?.isVerifiedPartner);

              return (
                <article
                  key={opp._id}
                  className="group rounded-2xl border border-[#E3ECEC] bg-white p-6 shadow-sm hover:border-[#42B0A8]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeStyle(
                          opp.opportunityType,
                        )}`}
                      >
                        {formatCategoryLabel(opp.opportunityType)}
                      </Badge>

                      {isPartner ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#008080] text-[11px] font-bold">
                          <Sparkles className="w-3 h-3 text-[#008080]" />
                          <span>Verified Partner</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-medium">
                          <span>Curated</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#004D4D] group-hover:text-[#007070] transition-colors mb-3 line-clamp-2 leading-snug">
                      {opp.title}
                    </h3>

                    {/* Organization & Location Meta */}
                    <div className="space-y-1.5 mb-4 text-xs text-slate-600">
                      <p className="flex items-center gap-2 line-clamp-1 font-medium">
                        <Building2 className="w-4 h-4 text-[#008080] shrink-0" />
                        <span>{opp.organizationName}</span>
                      </p>
                      <p className="flex items-center gap-2 line-clamp-1 text-slate-500">
                        <MapPin className="w-4 h-4 text-[#008080] shrink-0" />
                        <span>{opp.location || "Remote / Global"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Added {formatDate(opp.createdAt)}</span>
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                      {opp.shortDescription}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    {opp.officialLink ? (
                      <a
                        href={opp.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-[#004D4D] hover:bg-[#003535] text-white py-5 rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md">
                          <span>
                            {isPartner ? "Apply on Partner Portal" : "Explore Opportunity"}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    ) : (
                      <Link
                        href={`/find-your-opportunity/${opp._id}`}
                        className="block w-full"
                      >
                        <Button className="w-full bg-[#004D4D] hover:bg-[#003535] text-white py-5 rounded-xl font-semibold text-xs transition-all shadow-sm">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Unified Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex justify-center max-w-md mx-auto">
            <Pagination className="bg-white border border-[#D5E6E4] p-1.5 rounded-2xl shadow-sm">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`cursor-pointer border-none hover:bg-slate-50 ${
                      currentPage === 1 ? "opacity-30 pointer-events-none" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`cursor-pointer border-none rounded-lg text-xs font-semibold ${
                        currentPage === i + 1
                          ? "bg-[#004D4D] text-white hover:bg-[#003D3D] hover:text-white"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={`cursor-pointer border-none hover:bg-slate-50 ${
                      currentPage === totalPages
                        ? "opacity-30 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}

