import React from "react";
import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee"; // Adjust path based on your setup
import Image from "next/image";

const testimonials = [
  {
    name: "Dianno Russell",
    role: "Web Designer",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Jonny Wilson",
    role: "Medical Assistant",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Darrell Steward",
    role: "Nursing Assistant",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Jacob Jones",
    role: "Medical Assistant",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Kristin Watson",
    role: "Dog Trainer",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=150&h=150&q=80",
  },
];

const TestimonialCard = ({ item }: { item: (typeof testimonials)[0] }) => (
  <div className="relative w-[350px] cursor-pointer overflow-hidden rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md mx-2">
    <Quote className="absolute top-6 right-8 w-10 h-10 text-[#0D3B3F] opacity-5" />
    <p className="text-[#0D3B3F] text-[15px]  leading-relaxed mb-8 relative z-10">
      After three months, I&apos;m proud to be at the helm of a regional
      campaign, all thanks to Act on Climate.
    </p>
    <div className="flex items-center gap-4">
      <Image
        src={item.img}
        alt={item.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
        width={48}
        height={48}
      />
      <div>
        <h4 className="text-sm font-black text-[#0D3B3F] tracking-tight">
          {item.name}
        </h4>
        <p className="text-[11px] text-slate-400  uppercase tracking-wider">
          {item.role}
        </p>
      </div>
    </div>
  </div>
);

export default function CommunityFeedback() {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white ">
      {/* Section Title */}
      <div className="mb-16 text-center">
        <h2 className="text-[42px] text-[#0D3B3F] tracking-tighter">
          What Our Community Says
        </h2>
      </div>

      {/* MagicUI Marquee Rows */}
      <div className="relative flex flex-col gap-3">
        {/* Row 1: Right to Left (Default) */}
        <Marquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`top-${i}`} item={t} />
          ))}
        </Marquee>

        {/* Row 2: Left to Right (Reverse) */}
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`bottom-${i}`} item={t} />
          ))}
        </Marquee>

        {/* MagicUI Gradient Fades for Perfection */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
}
