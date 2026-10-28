"use client";

import React, { useState } from "react";
import InterviewModal from "./InterviewModal";

interface InterviewHeroProps {
  setOpenInterview?: (open: boolean) => void;
}

export default function InterviewHero({ setOpenInterview }: InterviewHeroProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  const handleOpen = () => {
    if (setOpenInterview) {
      setOpenInterview(true);
    } else {
      setInternalModalOpen(true);
    }
  };

  return (
    <section className="relative w-full min-h-[520px] py-20 flex items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/interview.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-black/30 text-white border border-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          Be Featured by Act on Climate
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl hero-font font-black tracking-tight leading-tight">
          Have a Story That Can Inspire Climate Action?
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-200 max-w-2xl mx-auto">
          We&apos;re looking to connect with people who are making a difference
          in the climate space. Whether you&apos;re a climate professional,
          researcher, entrepreneur, community leader, or emerging voice,
          we&apos;d love to hear your perspective.
        </p>

        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-200 max-w-2xl mx-auto">
          Share your experiences, insights, and ideas through an interview with
          Act on Climate. Help others learn from your journey and discover new
          ways to make an impact.
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleOpen}
            className="bg-[#00473e] hover:bg-[#00362f] text-white font-bold py-3.5 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 border border-white/20"
          >
            Apply for an Interview
          </button>
        </div>
      </div>

      {!setOpenInterview && (
        <InterviewModal
          isOpen={internalModalOpen}
          setOpen={setInternalModalOpen}
        />
      )}
    </section>
  );
}
