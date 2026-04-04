import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Transitioning to Green Energy Ca...",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Sat, 10:00 AM",
    location: "Central Park",
    day: "12",
    month: "Oct",
    image: "https://images.unsplash.com/photo-1540575861501-7ad05823c983", // Conference hall
  },
  {
    id: 2,
    title: "Transitioning to Green Energy Ca...",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Sat, 10:00 AM",
    location: "Central Park",
    day: "12",
    month: "Oct",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", // Networking
  },
  {
    id: 3,
    title: "Transitioning to Green Energy Ca...",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Sat, 10:00 AM",
    location: "Central Park",
    day: "12",
    month: "Oct",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Celebration/Confetti
  },
  // Add more as needed to fill the 2x3 grid
];

const ExploreEvents = () => {
  return (
    <section className=" py-20 px-6">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#004242] text-4xl  mb-4">Explore Our Events</h2>
          <p className="text-[#729094] max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Discover upcoming workshops, networking sessions, and community
            gatherings designed to accelerate your climate journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events
            .concat(events)
            .slice(0, 6)
            .map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
              >
                {/* Image & Date Badge */}
                <div className="relative h-56 w-full p-3 pb-0">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-white rounded-lg p-1.5 min-w-[45px] text-center shadow-md">
                      <p className="text-[10px] font-bold text-[#729094] uppercase leading-none mb-1">
                        {event.month}
                      </p>
                      <p className="text-xl font-black text-[#004242] leading-none">
                        {event.day}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-[#004242] text-lg  mb-2 truncate">
                    {event.title}
                  </h3>
                  <p className="text-[#729094] text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Info Rows */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-[#729094] text-[11px] font-semibold">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#729094] text-[11px] font-semibold">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full py-2.5 rounded-lg border border-slate-200 text-[#004242] text-xs font-bold hover:bg-slate-50 transition-colors mt-auto">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreEvents;
