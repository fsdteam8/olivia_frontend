"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Blog = {
  _id: string;
  title: string;
  category: string;
  content: string;
  thumbnailImage?: { url?: string };
};

const getExcerpt = (content: string) =>
  content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const ClimateOpportunities = () => {
  const params = useParams();
  const blogId = params?.id as string;

  const { data: currentBlog } = useQuery({
    queryKey: ["single-blog", blogId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/get-single-blog/${blogId}`,
      );
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Failed to fetch blog");
      return result.data as Blog;
    },
    enabled: !!blogId,
  });

  const { data: similarBlogs = [] } = useQuery({
    queryKey: ["similar-blogs", blogId, currentBlog?.category],
    queryFn: async () => {
      const category = encodeURIComponent(currentBlog!.category);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/get-blogs?category=${category}&limit=4`,
      );
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Failed to fetch similar blogs");
      return (result.data as Blog[]).filter((blog) => blog._id !== blogId).slice(0, 3);
    },
    enabled: !!currentBlog?.category,
  });

  if (!similarBlogs.length) return null;

  return (
    <section className="bg-[#EEF4F5] py-16 px-6">
      <div className="container">
        <h2 className="text-[#004242] text-3xl font-normal mb-10">
          Similar Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarBlogs.map((item) => (
            <div key={item._id} className="bg-[#EEF4F5] rounded-2xl overflow-hidden shadow-sm border border-[#E3ECEC] hover:shadow-md transition-shadow duration-300">
              <div className="relative h-56 w-full px-4 pt-4">
                <div className="relative h-full w-full rounded-xl overflow-hidden">
                  {item.thumbnailImage?.url && (
                    <Image src={item.thumbnailImage.url} alt={item.title} fill className="object-cover" />
                  )}
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block bg-[#5D8AA8] bg-opacity-60 text-white text-[10px] px-3 py-1 rounded-full mb-4">
                  {item.category}
                </span>

                <h3 className="text-[#004242] text-xl font-normal mb-3 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[#5D8AA8] text-xs leading-relaxed mb-6 line-clamp-3">
                  {getExcerpt(item.content)}
                </p>

                <div className="border-t border-slate-100">
                  <Link href={`/blog/${item._id}`} className="text-[#5D8AA8] text-xs flex items-center gap-2 hover:text-[#004242] transition-colors">
                    Read More <ArrowRight size={14} />
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

export default ClimateOpportunities;
