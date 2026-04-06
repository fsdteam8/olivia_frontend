"use client";

import { MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface Mentor {
  _id: string;
  firstName: string;
  lastName: string;
  image: { url: string };
  experience: { title: string }[];
  skills: string[];
  bio: string;
}

export const MentorsGallery = () => {
  const pathname = usePathname();
  const isAllPage = pathname === "/mentor-coaches/all";

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8; // Card limit per page

  // Search debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Search korle page abar 1 e niye jabe
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // TanStack Query with searchTerm and pagination
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mentors", debouncedSearch, page],
    queryFn: async () => {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentors-coaches`,
      );
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", limit.toString());
      if (debouncedSearch) {
        url.searchParams.append("searchTerm", debouncedSearch);
      }

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Failed to fetch mentors");
      return response.json();
    },
  });

  const mentors = apiResponse?.data as Mentor[];
  const meta = apiResponse?.meta;

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-4xl text-[#064E4B] mb-2">
              Meet Our Mentors & Coaches
            </h2>
            <p className="text-[#528B8A]">
              Browse {isLoading ? "..." : meta?.total || 0} professionals
              available for guidance.
            </p>
          </div>

          {isAllPage ? (
            <div className="relative w-full max-w-sm">
              <div className="relative flex items-center border border-[#E2E8F0] rounded-full pr-2 py-1 bg-white focus-within:ring-1 ring-[#064E4B]">
                <Input
                  type="text"
                  placeholder="Search by name"
                  className="border-none focus-visible:ring-0 shadow-none text-sm text-[#528B8A] placeholder:text-[#528B8A]/50 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="bg-[#064E4B] hover:bg-[#043331] text-white rounded-full px-6 h-8 text-xs  transition-all">
                  Search
                </Button>
              </div>
            </div>
          ) : (
            <Link
              href="/mentor-coaches/all"
              className="text-[#064E4B] flex items-center gap-2 hover:underline font-medium"
            >
              View All Coaches & Mentors <span>→</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(limit)
              .fill(0)
              .map((_, idx) => <MentorSkeleton key={idx} />)
          ) : mentors?.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[#528B8A]">
              No mentors found matching your search.
            </div>
          ) : (
            mentors?.map((mentor) => (
              <div
                key={mentor._id}
                className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" />
                    <Image
                      src={mentor.image?.url || "/placeholder-user.jpg"}
                      alt={`${mentor.firstName} ${mentor.lastName}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[#064E4B]  truncate">
                      {mentor.firstName} {mentor.lastName}
                    </h4>
                    <p className="text-xs text-[#528B8A] truncate">
                      {mentor.experience[0]?.title || "Professional"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
                  {mentor?.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] px-2 py-1 bg-[#F1F7F6] text-[#528B8A] rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-[#528B8A] leading-relaxed mb-6 flex-grow line-clamp-3">
                  {mentor?.bio}
                </p>

                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/mentor-coaches/${mentor?._id}`}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#064E4B] text-[#064E4B] py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <button className="bg-[#064E4B] text-white p-2 rounded-lg hover:bg-[#043331] transition-colors">
                    <CalendarDays className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination UI */}
        {meta && meta.totalPage > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className="border-[#064E4B] text-[#064E4B] hover:bg-[#F1F7F6]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>

            <div className="flex gap-2">
              {[...Array(meta.totalPage)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs  transition-all ${
                    page === i + 1
                      ? "bg-[#064E4B] text-white"
                      : "text-[#528B8A] hover:bg-[#F1F7F6] border border-transparent"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((old) => Math.min(old + 1, meta.totalPage))
              }
              disabled={page === meta.totalPage}
              className="border-[#064E4B] text-[#064E4B] hover:bg-[#F1F7F6]"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500 mt-10">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
};

const MentorSkeleton = () => (
  <div className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col space-y-4 h-[320px]">
    <div className="flex gap-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-5 w-12" />
      <Skeleton className="h-5 w-12" />
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="flex gap-2 mt-auto">
      <Skeleton className="h-10 flex-grow" />
      <Skeleton className="h-10 w-10" />
    </div>
  </div>
);
