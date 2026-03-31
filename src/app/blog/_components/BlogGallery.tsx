"use client";

import React, { useState } from "react";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  category: string;
  title: string;
  image: string;
  description: string;
}

const BlogGallery = () => {
  const categories = [
    "View All Posts",
    "Expert Insights",
    "Climate Careers",
    "Research",
    "Toolkit",
    "Community",
  ];

  const [activeCategory, setActiveCategory] = useState("View All Posts");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      category: "Expert Insights",
      title: "The Future of Carbon Markets in...",
      image:
        "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
    {
      id: 2,
      category: "Climate Careers",
      title: "Breaking Into Climate Tech: A C...",
      image:
        "https://plus.unsplash.com/premium_photo-1681486500323-ad09c481fc67?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
    {
      id: 3,
      category: "Research",
      title: "Ocean Acidification: New Findin...",
      image:
        "https://images.unsplash.com/photo-1615681666366-e8a35535fb72?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
    {
      id: 4,
      category: "Research",
      title: "How Cities Are Adapting to Risi...",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
    {
      id: 5,
      category: "Expert Insights",
      title: "From Finance to Sustainability...",
      image:
        "https://images.unsplash.com/photo-1454165833767-02a698d5874c?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
    {
      id: 6,
      category: "Climate Careers",
      title: "Biodiversity Loss and Its Impact...",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
      description: "45% improvement in space utilization with hot-desking...",
    },
  ];

  const filteredPosts =
    activeCategory === "View All Posts"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="bg-[#f0f7f7] py-20 px-6 md:px-20">
      <div className="container">
        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#004d4d] text-white"
                  : "bg-white text-[#004d4d] border border-gray-100 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* Individual Card Component */
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-[#EEF4F5] rounded-2xl overflow-hidden border-2 border-[#E3ECEC]  flex flex-col h-full">
      <div className="p-4">
        <Image
          width={800}
          height={400}
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover rounded-xl"
        />
      </div>

      <div className="px-6 pb-6 flex flex-col flex-grow">
        <span className="inline-block bg-[#5D8AA8] text-white text-[10px] px-3 py-1 rounded-full mb-3 w-fit">
          {post.category}
        </span>

        <h3 className="text-[#004242] font-normal text-xl mb-3 leading-tight">
          {post.title}
        </h3>

        <p className="text-[#5D8AA8] text-xs leading-relaxed mb-6 flex-grow">
          {post.description}
        </p>

        <Link
          href={`/blog/${post.id}`}
          className="text-[#004242] text-sm font-semibold flex items-center gap-2"
        >
          Read More <MoveRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BlogGallery;
