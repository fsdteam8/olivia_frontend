import React from "react";
import { Handshake, CalendarClock, Users2 } from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  {
    title: "Give Back",
    description:
      "Remember the mentors who helped guide your path? Now you can pay it forward by empowering the next generation of climate leaders as they start their careers.",
    icon: <Handshake className="w-6 h-6 text-[#42B0A8]" />,
  },
  {
    title: "Flexible Commitment",
    description:
      "Set your own mentoring schedule. Mentees meet with you for just one 45-minute virtual session per month, making it easy to fit into your calendar.",
    icon: <CalendarClock className="w-6 h-6 text-[#42B0A8]" />,
  },
  {
    title: "Join a Vibrant Community",
    description:
      "Connect with a growing network of hundreds of climate professionals across industries and share insights, opportunities, and resources.",
    icon: <Users2 className="w-6 h-6 text-[#42B0A8]" />,
  },
];

const WhyJoinRoster = () => {
  return (
    <section className="bg-[#EDF5F4] pb-20">
      <div className="container">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl text-[#064E4B] text-center mb-16 tracking-tight">
          Why join our roster of Coaches & Mentors
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-sm border border-white hover:shadow-md transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 bg-[#F1F7F6] rounded-full flex items-center justify-center mb-8">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl text-[#064E4B] mb-4">{item.title}</h3>
              <p className="text-[#528B8A] text-sm leading-relaxed max-w-[280px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinRoster;
