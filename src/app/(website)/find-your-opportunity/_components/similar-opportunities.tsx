"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Interfaces
interface Job {
  _id: string;
  title: string;
  category: string;
  location: string;
  companyName: string;
  description: string;
  media: {
    images: { url: string }[];
  };
  postedDate: string;
}

interface JobApiResponse {
  success: boolean;
  data: Job[];
}

const SimilarOpportunities = () => {
  const { id } = useParams(); // URL theke current job ID nilam

  // 1. Current Job details fetch korchi category janar jonno
  const { data: currentJobData } = useQuery<{ data: Job }>({
    queryKey: ["job-single", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/single/${id}`,
      );
      return res.json();
    },
    enabled: !!id,
  });

  const category = currentJobData?.data?.category;

  // 2. Oi same category-r onno job fetch korchi
  const { data, isLoading } = useQuery<JobApiResponse>({
    queryKey: ["similar-jobs", category, id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all?category=${encodeURIComponent(category!)}&limit=4`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch similar jobs");
      return res.json();
    },
    enabled: !!category, // Category pawa gele query cholbe
  });

  // Filter out current job and limit to 3
  const similarJobs = useMemo(() => {
    return data?.data?.filter((job) => job._id !== id).slice(0, 3) || [];
  }, [data, id]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <SimilarJobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (similarJobs.length === 0) return null;

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-[#004D4D] tracking-tight">
            Similar Climate Opportunities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group p-2 flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={job.media?.images?.[0]?.url || "/placeholder.png"}
                  alt={job.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/95 text-slate-800 border-none text-[10px]  tracking-widest px-2.5 py-1 shadow-sm">
                    HYBRID
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4 text-[11px] ">
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {job.category}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">
                    {job.companyName} · {job.location}
                  </span>
                </div>

                <h3 className="text-xl  text-[#004D4D] mb-3 line-clamp-1">
                  {job.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
                  {job.description?.replace(/<[^>]*>?/gm, "") ||
                    "A climate-focused opportunity to drive impact."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px]  text-slate-400 uppercase tracking-tight">
                    <Clock className="w-3.5 h-3.5" />
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                  <Link href={`/find-your-opportunity/${job._id}`}>
                    <Button
                      variant="outline"
                      className="bg-[#004D4D] hover:bg-[#003D3D] text-white hover:text-white border-none rounded-lg px-6 h-10 text-xs  transition-all active:scale-95"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Reuseable Skeleton
const SimilarJobCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm p-2">
    <Skeleton className="aspect-[16/10] w-full rounded-xl" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export default SimilarOpportunities;
