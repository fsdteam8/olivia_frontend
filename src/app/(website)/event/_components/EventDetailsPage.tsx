import React from "react";
import { Check, Calendar, Clock, Tag } from "lucide-react";

const EventDetailsPage = () => {
  const learningPoints = [
    "Identifying high-growth sectors in the green economy.",
    "How to leverage data for sustainability reporting.",
    "Strategies for transitioning from traditional industries.",
    "Networking with top-tier climate recruiters.",
  ];

  const agendaItems = [
    {
      time: "10:00 AM - 10:30 AM",
      title: "Opening Keynote: The State of Climate 2024",
      speaker: "Dr. Sarah Jenkins, Chief Scientist",
    },
    {
      time: "10:30 AM - 11:30 AM",
      title: "Panel: Scaling Renewable Infrastructure",
      speaker: "Moderated by Mark Thompson with Guest Industry Leaders",
    },
    {
      time: "11:30 AM - 12:30 PM",
      title: "Workshop: Carbon Accounting 101",
      speaker: "Elena Rodriguez, Sustainability Consultant",
    },
  ];

  return (
    <div className="bg-[#f2f7f7] min-h-screen py-16 px-6 md:px-12">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-8 space-y-12">
          {/* About Section */}
          <section>
            <h2 className="text-[#004242] text-3xl  mb-6">About the Event</h2>
            <div className="text-[#729094] space-y-4 leading-relaxed font-medium">
              <p>
                Welcome to the premier digital gathering for aspiring climate
                professionals and seasoned experts alike. In this intensive
                3-hour session, we explore the rapidly evolving landscape of the
                green economy and how you can position yourself for high-impact
                roles.
              </p>
              <p>
                Our mission is to bridge the gap between passion for the planet
                and professional action. We&apos;ll dive deep into corporate
                sustainability strategies, renewable energy advancements, and
                the policy shifts driving investment toward a net-zero future.
              </p>
            </div>
          </section>

          {/* What You Will Learn Section */}
          <section className="bg-white rounded-3xl py-8 px-6 border border-slate-100 shadow-sm">
            <h3 className="text-[#004242] text-2xl  mb-8">
              What You Will Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              {learningPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check
                    className="text-[#004242] mt-1 flex-shrink-0"
                    size={18}
                    strokeWidth={3}
                  />
                  <span className="text-[#729094] text-sm font-semibold leading-tight">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Event Agenda Section */}
          <section>
            <h3 className="text-[#004242] text-2xl  mb-8">Event Agenda</h3>
            <div className="space-y-10 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              {agendaItems.map((item, index) => (
                <div key={index} className="relative pl-10">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#004242] border-2 border-white shadow-sm z-10" />

                  <p className="text-[#729094] text-xs font-bold uppercase tracking-wider mb-1">
                    {item.time}
                  </p>
                  <h4 className="text-[#004242] text-lg  mb-1">{item.title}</h4>
                  <p className="text-[#94a3b8] text-sm font-medium italic">
                    {item.speaker}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sidebar Card */}
        <aside className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-8">
            <h4 className="text-[#004242] text-xl font-extrabold mb-8">
              Event Details
            </h4>

            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#729094] text-sm font-bold">
                  <Calendar size={18} className="opacity-60" />
                  <span>Date</span>
                </div>
                <span className="text-[#004242] text-sm font-extrabold">
                  Oct 24, 2024
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#729094] text-sm font-bold">
                  <Clock size={18} className="opacity-60" />
                  <span>Time</span>
                </div>
                <span className="text-[#004242] text-sm font-extrabold">
                  10:00 AM EST
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#729094] text-sm font-bold">
                  <Tag size={18} className="opacity-60" />
                  <span>Price</span>
                </div>
                <span className="text-[#22c55e] text-sm font-extrabold">
                  Free
                </span>
              </div>
            </div>

            <button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-4 rounded-xl font-bold transition-all active:scale-[0.98] mb-4">
              Register for Event
            </button>

            <p className="text-center text-[#94a3b8] text-[10px] font-bold uppercase tracking-tighter">
              Limited spots available for the live Q&A session.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetailsPage;
