"use client";

import React from "react";
import { Play, Headphones, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// ---------------- TYPES ----------------

interface MediaItem {
  _id: string;
  title: string;
  mediaType: "video" | "audio" | "article";
  description: string;
  contentUrl: string;
  thumbnailImage: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: MediaItem[];
}

// ---------------- API FETCH ----------------

const fetchMedia = async (): Promise<MediaItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-media`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  const data: ApiResponse = await res.json();
  return data.data;
};

// ---------------- FILTER BAR ----------------

const FilterBar = () => {
  const categories = [
    "All",
    "Videos",
    "Interested in Being a Speaker",
    "Event Recordings",
    "Expert Interviews",
    "Insights",
    "Community",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat, idx) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
            idx === 0
              ? "bg-[#00473e] text-white border-[#00473e]"
              : "bg-white text-[#00473e] border-gray-100 shadow-sm hover:shadow-md"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

// ---------------- RESOURCE CARD ----------------

const ResourceCard = ({ resource }: { resource: MediaItem }) => {
  return (
    <div className="bg-[#eff4f7] rounded-[2.5rem] p-5 flex flex-col h-full border border-white shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full rounded-[1.8rem] overflow-hidden mb-6 group">
        <Image
          src={resource.thumbnailImage}
          alt={resource.title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#00473e]/80 p-3 rounded-full text-white backdrop-blur-sm border border-white/20">
            {resource.mediaType === "video" ? (
              <Play size={24} fill="currentColor" />
            ) : (
              <Headphones size={24} />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-1">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#00473e] text-white text-[10px] font-bold uppercase tracking-wider mb-4">
          {resource.mediaType}
        </span>

        <h3 className="text-[#00473e] text-xl font-extrabold leading-[1.2] mb-3 line-clamp-2">
          {resource.title}
        </h3>

        <p className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Link */}
      <div className="pt-4 border-t border-slate-200 mt-auto">
        <Link
          href={"/media/" + resource._id}
          target="_blank"
          className="flex items-center text-[#00473e] font-bold text-sm group"
        >
          Open Media
          <ArrowRight
            size={16}
            className="ml-2 transition-transform group-hover:translate-x-1"
            strokeWidth={3}
          />
        </Link>
      </div>
    </div>
  );
};

// ---------------- MAIN PAGE ----------------

export default function ResourceGridPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["media-posts"],
    queryFn: fetchMedia,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading media...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">Failed to load media</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-8">
      <div className="container mx-auto">
        <FilterBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((item) => (
            <ResourceCard key={item._id} resource={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
