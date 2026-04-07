"use client";

import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Event {
  _id: string;
  title: string;
  description: string;
  lumaUrl: string;
  thumbnail: string;
  createdAt: string;
}

const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/published`,
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Failed to fetch events");
  return data.data;
};

const ExploreEvents = () => {
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p className="text-center py-20">Loading events...</p>;
  if (isError)
    return (
      <p className="text-center py-20 text-red-500">Failed to load events.</p>
    );

  return (
    <section className="py-20 px-6">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#004242] text-4xl mb-4">Explore Our Events</h2>
          <p className="text-[#729094] max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Discover upcoming workshops, networking sessions, and community
            gatherings designed to accelerate your climate journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            // Format date
            const dateObj = new Date(event.createdAt);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("default", { month: "short" });

            return (
              <div
                key={event._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
              >
                {/* Image & Date Badge */}
                <div className="relative h-56 w-full p-3 pb-0">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-white rounded-lg p-1.5 min-w-[45px] text-center shadow-md">
                      <p className="text-[10px] font-bold text-[#729094] uppercase leading-none mb-1">
                        {month}
                      </p>
                      <p className="text-xl font-black text-[#004242] leading-none">
                        {day}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-[#004242] text-lg mb-2 truncate">
                    {event.title}
                  </h3>
                  <p className="text-[#729094] text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Info Rows */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-[#729094] text-[11px] font-semibold">
                      <Calendar size={14} />
                      <span>{dateObj.toDateString()}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <a
                    href={event.lumaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg border border-slate-200 text-[#004242] text-xs font-bold hover:bg-slate-50 transition-colors mt-auto text-center"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreEvents;
