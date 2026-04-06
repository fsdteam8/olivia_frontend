/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Linkedin,
  Mail,
  Calendar,
  Briefcase,
  Heart,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MentorDetails = () => {
  const { id } = useParams();

  // 1. Current Mentor Details Fetch
  const {
    data: mentor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mentor", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentors-coaches/${id}`,
      );
      const result = await res.json();
      return result.data;
    },
    enabled: !!id,
  });

  // 2. Other Mentors Fetch (Explore Section)
  const { data: otherMentors, isLoading: isOthersLoading } = useQuery({
    queryKey: ["other-mentors", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentors-coaches`,
      );
      const result = await res.json();

      // API response path: result.data (Array)
      const allMentors = result.data || [];

      // Current mentor-ke list theke bad dewa ebong top 4-ta neya
      return allMentors.filter((m: any) => m._id !== id).slice(0, 4);
    },
    enabled: !!id,
  });

  if (isLoading) return <MentorDetailsSkeleton />;
  if (error || !mentor)
    return (
      <div className="text-center py-20 text-red-500 ">
        Error loading mentor details.
      </div>
    );

  return (
    <div className="min-h-screen mt-20 pb-20 !space-y-12">
      {/* 1. Profile Header Section */}
      <section className="bg-[#eef4f5] py-20">
        <div className="container mx-auto flex flex-col md:flex-row gap-10 ">
          <div className="relative w-full md:w-[350px] h-[350px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src={mentor.image?.url || "/placeholder-user.jpg"}
              alt={`${mentor.firstName} ${mentor.lastName}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 w-full">
            <div>
              <span className="bg-[#053535] text-white text-[12px] px-4 py-1 rounded-full uppercase tracking-wider ">
                {mentor.type}
              </span>
              <h1 className="text-[36px] md:text-[48px] text-[#053535] leading-tight mt-3 ">
                {mentor.firstName} {mentor.lastName}
              </h1>
              <p className="text-[#053535] opacity-80 text-lg">{mentor.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#053535]">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[#008080]" />
                <span>{mentor.experienceYears}+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-[#008080]" />
                <span>{mentor.languages?.join(", ") || "English"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#008080]" />
                <span className="truncate">{mentor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#008080]" />
                <span>{mentor.availability || "Available for sessions"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={mentor.bookingLink || "#"}
                className="bg-[#053535] hover:bg-[#042a2a] text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all active:scale-95 "
              >
                Book a Session <ArrowRight size={20} />
              </Link>
              <div className="flex gap-2">
                {mentor.linkedin && (
                  <Link
                    href={mentor.linkedin}
                    target="_blank"
                    className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-[#053535]"
                  >
                    <Linkedin size={20} />
                  </Link>
                )}
                {mentor.website && (
                  <Link
                    href={mentor.website}
                    target="_blank"
                    className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-[#053535]"
                  >
                    <Globe size={20} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className=" bg-white">
        <div className="space-y-4 container mx-auto px-4 py-8">
          <h2 className="text-[28px]  text-[#053535]">About</h2>
          <div>{mentor.about}</div>
        </div>
      </section>

      {/* 3. Areas of Expertise */}
      <section className="bg-[#eef4f5] ">
        <div className="space-y-4 container mx-auto py-10">
          <h2 className="text-[28px]  text-[#053535]">Areas of Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {mentor.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-6 py-3 bg-[#E6F3F3] text-[#008080] rounded-lg border border-[#B3DADA] "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Professional Experience */}
      <section className="container mx-auto px-4">
        <div className="space-y-4">
          <h2 className="text-[28px]  text-[#053535]">
            Professional Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentor.experience?.map((exp: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border border-slate-100 flex items-start gap-4"
              >
                <div className="p-3 bg-gray-50 rounded-xl text-[#008080] shrink-0">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className=" text-[#053535] text-lg">{exp.title}</h3>
                  <p className="text-gray-500 mt-1">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How I Can Support You */}
      <section className="bg-[#eef4f5] py-12">
        <div className="space-y-4 container mx-auto">
          <h2 className="text-[28px]  text-[#053535]">How I Can Support You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentor.support?.map((sup: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border border-slate-100 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 text-[#008080]">
                  <Heart size={24} />
                  <h3 className=" text-[#053535]">{sup.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {sup.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Explore Other Mentors Section */}
      <section className="container mx-auto ">
        <div className="">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px]  text-[#053535]">
              Explore Other Mentors
            </h2>
            <Link
              href="/mentor-coaches/all"
              className="text-[#008080]  hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isOthersLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-white border border-slate-100 animate-pulse rounded-2xl"
                  />
                ))
            ) : otherMentors && otherMentors.length > 0 ? (
              otherMentors.map((m: any) => (
                <div
                  key={m._id}
                  className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow bg-white group"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={m.image?.url || "/placeholder-user.jpg"}
                        alt={m.firstName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-[#064E4B]  truncate">
                        {m.firstName} {m.lastName}
                      </h4>
                      <p className="text-xs text-[#528B8A] truncate">
                        {m.experience?.[0]?.title || "Professional"}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#528B8A] leading-relaxed mb-6 flex-grow line-clamp-3">
                    {m.bio}
                  </p>

                  <div className="flex gap-2 mt-auto">
                    <Link href={`/mentor-coaches/${m._id}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-[#064E4B] text-[#064E4B] py-2 rounded-lg text-xs  hover:bg-[#064E4B] hover:text-white transition-all"
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
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-gray-400">
                  No other mentors found at this moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const MentorDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-32 space-y-10 animate-pulse">
    <div className="h-[400px] bg-gray-100 rounded-[24px]" />
    <div className="h-40 bg-gray-100 rounded-[24px]" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-2xl" />
        ))}
    </div>
  </div>
);

export default MentorDetails;
