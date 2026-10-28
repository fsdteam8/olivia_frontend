"use client";

import React from "react";
import { Play, Headphones, ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { sanitizeHtml } from "@/lib/sanitize";

// ---------------- TYPES ----------------

interface MediaItem {
  _id: string;
  title: string;
  mediaType: "url" | "audio" | "files";
  category: string;
  description: string;
  contentUrl: string;
  thumbnailImage: string;
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: MediaItem[];
}

export type TCategory =
  | "video"
  | "event-recording"
  | "expert-interview"
  | "insight"
  | "community";

// ---------------- FRONTEND DISPLAY + BACKEND VALUE ----------------

const MEDIA_CATEGORIES = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Videos",
    value: "video",
  },
  {
    label: "Event Recordings",
    value: "event-recording",
  },
  {
    label: "Expert Interviews",
    value: "expert-interview",
  },
  {
    label: "Insights",
    value: "insight",
  },
  {
    label: "Community",
    value: "community",
  },
];

// ---------------- API FETCH ----------------

const fetchMedia = async (category?: string): Promise<MediaItem[]> => {
  const params = new URLSearchParams();

  // only send category if not "All"
  if (category && category !== "All") {
    params.set("category", category);
  }

  const queryString = params.toString();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-media${
    queryString ? `?${queryString}` : ""
  }`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  const data: ApiResponse = await res.json();

  return data.data;
};

// ---------------- FILTER BAR ----------------

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: typeof MEDIA_CATEGORIES;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => onCategoryChange(cat.value)}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
            activeCategory === cat.value
              ? "bg-[#00473e] text-white border-[#00473e] shadow-sm"
              : "bg-white text-[#00473e] border-slate-200 hover:border-[#00473e]/40 shadow-sm hover:shadow"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

// ---------------- RESOURCE CARD ----------------

const ResourceCard = ({ resource }: { resource: MediaItem }) => {
  return (
    <div className="bg-[#eff4f7] rounded-[2.5rem] p-5 flex flex-col h-full border border-white shadow-sm hover:shadow-md transition-shadow">
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
            {resource.mediaType === "url" ? (
              <Play size={24} fill="currentColor" />
            ) : resource.mediaType === "audio" ? (
              <Headphones size={24} />
            ) : (
              <FileText size={24} />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-1">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#00473e] text-white text-[10px] font-bold uppercase tracking-wider mb-4">
          {resource.mediaType === "url"
            ? "Video"
            : resource.mediaType === "audio"
              ? "Audio"
              : "File"}
        </span>

        <h3 className="text-[#00473e] text-xl font-extrabold leading-[1.2] mb-3 line-clamp-2">
          {resource.title}
        </h3>

        <p
          className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(
              resource.description
                ? resource.description.slice(0, 200) +
                    (resource.description.length > 200 ? "..." : "")
                : ""
            ),
          }}
        />
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
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["media-posts", selectedCategory],
    queryFn: () => fetchMedia(selectedCategory),
  });

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById("media-gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="media-content" className="bg-[#f8fafc] py-20 px-4 sm:px-8">
      <div className="container mx-auto">
        {/* SECTION 2 · Introduction to Media & Resources */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00473e]/10 text-[#00473e] text-xs font-bold uppercase tracking-wider">
            Media & Resources
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004242] tracking-tight">
            Ideas and Insights for Climate Action
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore content designed to inform, connect, and inspire. From
            expert interviews and career insights to educational resources and
            community stories, discover new perspectives and practical ways to
            contribute to climate solutions.
          </p>
        </div>

        {/* SECTION 3 · Organize Content into Clear Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {/* Category 1: Expert Interviews */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src="/media/img_1.jpeg"
                  alt="Expert Interviews"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#00473e]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                  <Play size={12} fill="currentColor" />
                  <span>Interview</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004242] mb-2.5 group-hover:text-[#00473e] transition-colors">
                  Expert Interviews
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hear from climate professionals, researchers, entrepreneurs, and
                  advocates working on solutions to today&apos;s environmental
                  challenges.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleSelectCategory("expert-interview")}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#004242] hover:bg-[#003333] text-white text-xs font-bold py-3.5 px-4 rounded-lg transition-colors active:scale-98 shadow-sm"
              >
                <span>Watch & Listen</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Category 2: Articles & Insights */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src="/media/img_2.jpeg"
                  alt="Articles & Insights"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#00473e]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                  <FileText size={12} />
                  <span>Insights</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004242] mb-2.5 group-hover:text-[#00473e] transition-colors">
                  Articles & Insights
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Discover fresh perspectives, practical guidance, and ideas to
                  help you understand climate issues and explore opportunities for
                  impact.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleSelectCategory("insight")}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#004242] hover:bg-[#003333] text-white text-xs font-bold py-3.5 px-4 rounded-lg transition-colors active:scale-98 shadow-sm"
              >
                <span>Read Articles</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Category 3: Climate Careers & Community */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src="/media/img_3.jpeg"
                  alt="Climate Careers & Community"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#00473e]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                  <Headphones size={12} />
                  <span>Community</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#004242] mb-2.5 group-hover:text-[#00473e] transition-colors">
                  Climate Careers & Community
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Learn from people building careers in climate and discover
                  insights that can help you grow your skills, network, and
                  impact.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleSelectCategory("community")}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#004242] hover:bg-[#003333] text-white text-xs font-bold py-3.5 px-4 rounded-lg transition-colors active:scale-98 shadow-sm"
              >
                <span>Explore Stories</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section Anchor & Filter */}
        <div id="media-gallery" className="pt-4">
          <FilterBar
            categories={MEDIA_CATEGORIES}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {isLoading ? (
            <div className="text-center py-20 text-base font-semibold text-slate-500">
              Loading media...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">
              Failed to load media
            </div>
          ) : data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <ResourceCard key={item._id} resource={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#00473e]/20 bg-white px-6 py-16 text-center">
              <h3 className="text-2xl font-bold text-[#00473e]">
                No media found
              </h3>
              <p className="mt-3 text-sm text-slate-500">
                {selectedCategory === "All"
                  ? "No media available right now."
                  : `No media found in the selected category.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
