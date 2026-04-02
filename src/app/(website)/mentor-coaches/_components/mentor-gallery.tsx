/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";

export const MentorsGallery = () => {
  const mentors = Array(8).fill({
    name: "Flores, Juanita",
    role: "VP of Product",
    company: "Stripe",
    location: "San Francisco, US",
    tags: ["Product Management", "Leadership", "Career Development"],
    description:
      "Former Google PM with 12+ years building products used by millions...",
  });

  return (
    <section>
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl text-[#064E4B] mb-2">
              Meet Our Mentors & Coaches
            </h2>
            <p className="text-[#528B8A]">
              Browse 124 professionals available for guidance.
            </p>
          </div>
          <button className="text-[#064E4B]  flex items-center gap-2 hover:underline">
            View All Coaches & Mentors <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((m, idx) => (
            <div
              key={idx}
              className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                  <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" />
                  <Image
                    src="/assist.jpg"
                    alt={m.name}
                    width={1000}
                    height={1000}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#064E4B]">{m.name}</h4>
                  <p className="text-xs text-[#528B8A]">{m.role}</p>
                  <p className="text-[10px] text-slate-400">{m.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-[#528B8A] mb-4">
                <MapPin className="w-3 h-3" /> {m.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {m.tags.map((tag: any) => (
                  <span
                    key={tag}
                    className="text-[9px] px-2 py-1 bg-[#F1F7F6] text-[#528B8A] rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-[#528B8A] leading-relaxed mb-6 flex-grow">
                {m.description}
              </p>

              <div className="flex gap-2">
                <button className="flex-grow border-2 border-[#064E4B] text-[#064E4B] py-2 rounded-lg text-xs  hover:bg-slate-50">
                  View Profile
                </button>
                <button className="bg-[#064E4B] text-white p-2 rounded-lg hover:bg-[#043331]">
                  <CalendarDays className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
