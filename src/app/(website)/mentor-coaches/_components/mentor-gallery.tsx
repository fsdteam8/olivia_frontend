"use client";

import { MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn skeleton path verify kore nio
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Interface define kora holo API response onujayi
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
  // TanStack Query integration
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentors-coaches`,
      );
      if (!response.ok) throw new Error("Failed to fetch mentors");
      const result = await response.json();
      return result.data as Mentor[];
    },
  });

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl text-[#064E4B] mb-2">
              Meet Our Mentors & Coaches
            </h2>
            <p className="text-[#528B8A]">
              Browse {isLoading ? "..." : data?.length} professionals available
              for guidance.
            </p>
          </div>
          <button className="text-[#064E4B] flex items-center gap-2 hover:underline font-medium">
            View All Coaches & Mentors <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? // Loading state e Skeleton dekhabe
              Array(8)
                .fill(0)
                .map((_, idx) => <MentorSkeleton key={idx} />)
            : data?.map((mentor) => (
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
                      <h4 className="text-[#064E4B] truncate">
                        {mentor.firstName} {mentor.lastName}
                      </h4>
                      <p className="text-xs text-[#528B8A] truncate">
                        {mentor.experience[0]?.title || "Professional"}
                      </p>
                      {/* <p className="text-[10px] text-slate-400">Company Name</p> */}
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-1 text-[10px] text-[#528B8A] mb-4">
                    <MapPin className="w-3 h-3" /> Remote / Global
                  </div> */}

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

                  <div className="flex gap-2">
                    <Link
                      href={`/mentor-caches/${mentor?._id}`}
                      className="w-full"
                    >
                      <Button className="flex-1 w-full border-2 border-[#064E4B] bg-inherit text-primary py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">
                        View Profile
                      </Button>
                    </Link>
                    <button className="bg-[#064E4B] text-white p-2 rounded-lg hover:bg-[#043331] transition-colors">
                      <CalendarDays className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {isError && (
          <p className="text-center text-red-500 mt-10">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
};

// Shadcn Skeleton Component for Loading State
const MentorSkeleton = () => (
  <div className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col space-y-4">
    <div className="flex gap-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <Skeleton className="h-3 w-24" />
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="h-12 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-grow" />
      <Skeleton className="h-10 w-10" />
    </div>
  </div>
);
