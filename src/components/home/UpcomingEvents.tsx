import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const events = [
  {
    title: "Global Community Town Hall",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Oct 12",
    time: "Sat, 10:00 AM",
    location: "Central Park",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070", // Crowd/Celebration
  },
  {
    title: "Climate Policy Advocacy 101",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Oct 12",
    time: "Sat, 10:00 AM",
    location: "Central Park",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012", // Stage/Event
  },
  {
    title: "Transitioning to Green Energy Ca...",
    description:
      "Meet fellow members from around the world and share your current projects.",
    date: "Oct 12",
    time: "Sat, 10:00 AM",
    location: "Central Park",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070", // Presentation/Lighting
  },
];

export const UpcomingEvents = () => {
  return (
    <section className="py-[100px] bg-[#F1F5F9]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[40px] hero-font text-[#0D3B3F] leading-tight">
              Upcoming Events
            </h2>
            <p className="text-[#5D8AA8] font-medium mt-2">
              Join us live and learn from industry leaders.
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-[#004242]  hover:bg-transparent flex items-center gap-2 group"
          >
            View All Events{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <Card
              key={i}
              className="rounded-[16px]  p-2 pb-4  overflow-hidden overflow-hidden border-none shadow-sm bg-white"
            >
              {/* Image Section with Date Badge */}
              <div className="relative ">
                <Image
                  height={400}
                  width={400}
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md text-center min-w-[50px]">
                  <p className="text-[10px]  text-blue-500 uppercase tracking-tighter">
                    Oct
                  </p>
                  <p className="text-xl font-black text-[#0D3B3F] leading-none">
                    12
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="">
                <h3 className="text-xl font-black text-[#0D3B3F] mb-3 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-slate-500 text-[13px] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {event.location}
                  </div>
                </div>

                <Button className="w-full py-6 rounded-xl border border-slate-100 bg-white text-[#0D3B3F] font-black hover:bg-slate-50 shadow-none">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
