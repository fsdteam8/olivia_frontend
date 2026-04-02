import React from "react";
import Image from "next/image";
import { Play, Headphones, ArrowRight } from "lucide-react";

const recentViews = [
  {
    id: 1,
    title: "Global Climate Summit 2025 Ke...",
    category: "Research",
    type: "video",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // Mountain/Summit
  },
  {
    id: 2,
    title: "Transitioning to Renewable Ene...",
    category: "Expert Insights",
    type: "podcast",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // Landscape/City
  },
  {
    id: 3,
    title: "The Rise of Climate Tech Startups",
    category: "Climate Careers",
    type: "image",
    description:
      "45% improvement in space utilization with hot-desking 45% improvement in space utilization with hot-desking 45% improvemen in space utilization with hot-desking",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Office/Tech
  },
];

const RecentView = () => {
  return (
    <section className="bg-[#f2f7f7] py-16 px-6 md:px-12 lg:px-20">
      <div className="container">
        <h2 className="text-[#004242] text-3xl  mb-10">Recent view</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentViews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50 flex flex-col"
            >
              {/* Media Section */}
              <div className="relative aspect-[16/10] w-full p-3 pb-0">
                <div className="relative h-full w-full rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay Icons */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    {item.type === "video" && (
                      <div className="w-12 h-12 bg-[#004242] rounded-full flex items-center justify-center text-white shadow-lg">
                        <Play fill="white" size={20} className="ml-1" />
                      </div>
                    )}
                    {item.type === "podcast" && (
                      <div className="w-12 h-12 bg-[#004242] rounded-full flex items-center justify-center text-white shadow-lg">
                        <Headphones size={24} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="bg-[#004242] text-white text-[10px]  px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-[#004242] text-lg  mb-3 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[#729094] text-[11px] font-medium leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>

                {/* Footer Link */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-[#729094] text-xs  hover:text-[#004242] transition-colors group">
                    Watch Video
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentView;
