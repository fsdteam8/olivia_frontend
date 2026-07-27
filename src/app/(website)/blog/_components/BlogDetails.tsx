"use client";

import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Blog = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  thumbnailImage: {
    url: string;
  };
  author?: {
    name?: string;
    description?: string;
    profileImage?: {
      url?: string;
    };
  };
};

const BlogDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["single-blog", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/get-single-blog/${id}`);
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch blog");
      }
      return result.data as Blog;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" min-h-screen ">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#F8FBFB] pb-4">
        <div className="container px-4 pt-12">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={data?.thumbnailImage?.url || ""}
              alt={data?.title || "blog"}
              fill
              className="object-cover"
            />
          </div>
          {/* Post Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-[#729094] text-sm font-medium">
            <div className="flex items-center gap-3 rounded-2xl border border-[#dceaea] bg-white px-3 py-2 shadow-sm">
              {data?.author?.profileImage?.url ? (
                <Image
                  src={data.author.profileImage.url}
                  alt={data.author.name || "Author"}
                  width={44}
                  height={44}
                  unoptimized
                  className="h-11 w-11 rounded-full border-2 border-[#d8eeee] object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#004242] text-sm font-semibold text-white">
                  {data?.author?.name?.slice(0, 1).toUpperCase() || <User size={18} />}
                </div>
              )}
              <div className="leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#729094]">Written by</p>
                <p className="mt-1 text-sm font-semibold text-[#004242]">{data?.author?.name || "Act on Climate Team"}</p>
                {data?.author?.description && (
                  <p className="mt-0.5 max-w-48 truncate text-xs font-normal text-[#729094]">{data.author.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl px-2 py-2">
              <Calendar size={16} />
              <span>
                {new Date(data?.createdAt || "").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-[#004242] text-4xl md:text-5xl tracking-tight mb-12">
            {data?.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-8 font-sans text-slate-700">
            <main className="flex-1 space-y-8">
              <header className="space-y-4">
                <div
                  className="leading-relaxed text-sm text-slate-600"
                  dangerouslySetInnerHTML={{
                    __html: data?.content || "",
                  }}
                />
              </header>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
