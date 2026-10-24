"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { CourseApiResponse, getCourseOutcomes } from "@/lib/course-utils";

const WhatYouWillLearn = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data } = useQuery<CourseApiResponse>({
    queryKey: ["course-details", id, token],
    queryFn: async () => {
      const res = await api.get(`/course/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const course = data?.data;
  if (!course) return null;

  // Only render if dynamic learning outcomes exist for this course in the dashboard
  const outcomes =
    course.learningOutcomes && Array.isArray(course.learningOutcomes)
      ? course.learningOutcomes
          .map((item) => (typeof item === "string" ? item.trim() : ""))
          .filter(Boolean)
      : [];

  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="container">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#008080]" />
            <h2 className="text-2xl font-bold text-[#004242] tracking-tight">
              What You Will Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {outcomes.map((topic, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-[#F9FCFB] shadow-xs hover:border-[#008080]/30 transition-all"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#008080] shrink-0 mt-0.5"
                />
                <span className="text-gray-700 font-medium text-sm leading-relaxed">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillLearn;
