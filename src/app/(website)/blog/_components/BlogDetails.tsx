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
};

const BlogDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["single-blog", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/apply-blog/get-single-blog/${id}`,
      );
      const result = await res.json();
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
          <div className="mt-8 flex items-center gap-6 text-[#729094] text-sm font-medium">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>By Act on Climate Team</span>
            </div>

            <div className="flex items-center gap-2">
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
