import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const opportunities = [
  {
    id: 1,
    title: "The Future of Carbon Markets in...",
    category: "Expert Insights",
    description:
      "45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef", // Factory/Smoke
  },
  {
    id: 2,
    title: "Breaking Into Climate Tech: A C...",
    category: "Climate Careers",
    description:
      "45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking.",
    image: "https://images.unsplash.com/photo-1466611653911-95282ee36567", // Wind Turbines
  },
  {
    id: 3,
    title: "Ocean Acidification: New Findin...",
    category: "Research",
    description:
      "45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking. 45% improvement in space utilization with hot-desking.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", // Coral Reef
  },
];

const ClimateOpportunities = () => {
  return (
    <section className="bg-[#EEF4F5] py-16 px-6">
      <div className="container">
        <h2 className="text-[#004242] text-3xl font-normal mb-10">
          Similar Climate Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((item) => (
            <div
              key={item.id}
              className="bg-[#EEF4F5] rounded-2xl overflow-hidden shadow-sm border border-[#E3ECEC] hover:shadow-md transition-shadow duration-300"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full px-4 pt-4">
                <div className="relative h-full w-full rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <span className="inline-block bg-[#5D8AA8] bg-opacity-60 text-white text-[10px]  px-3 py-1 rounded-full mb-4">
                  {item.category}
                </span>

                <h3 className="text-[#004242] text-xl font-normal mb-3 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[#5D8AA8] text-xs leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                <div className=" border-t border-slate-100">
                  <a
                    href="#"
                    className="text-[#5D8AA8] text-xs  flex items-center gap-2 hover:text-[#004242] transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </a>
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
