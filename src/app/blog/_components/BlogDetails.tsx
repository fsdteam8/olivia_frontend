import React from "react";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import EventDetailsPage from "@/app/event/_components/EventDetailsPage";

const BlogDetails = () => {
  return (
    <div className=" min-h-screen ">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#F8FBFB] pb-4">
        <div className="container px-4 pt-12">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              alt="Climate Tech Forest"
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
              <span>March 2026</span>
            </div>
          </div>

          <h1 className="mt-4 text-[#004242] text-4xl md:text-5xl  tracking-tight mb-12">
            Navigating the Future of Climate Tech Careers
          </h1>
        </div>
      </div>
      <EventDetailsPage />
    </div>
  );
};

export default BlogDetails;
