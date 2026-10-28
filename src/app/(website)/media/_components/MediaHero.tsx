"use client";

import React from "react";
import Image from "next/image";

interface MediaHeroProps {
  setOpenInterview?: (open: boolean) => void;
}

export default function MediaHero({ setOpenInterview }: MediaHeroProps) {
  const handleScrollToContent = () => {
    const el = document.getElementById("media-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[660px] w-full flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/media.jpg"
        alt="Climate Stories & Media"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover z-0"
      />

      {/* Overlay matching standard site hero */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(0, 0, 0, 0.60)" }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Main Heading */}
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl hero-font font-bold tracking-tight leading-tight">
          Climate Stories. Real People. Meaningful Action.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Discover the people, ideas, and solutions shaping a more sustainable
          future. Explore conversations with climate professionals, practical
          resources, and inspiring perspectives from across the climate
          community.
        </p>

        {/* Dual Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleScrollToContent}
            className="bg-[#004242] hover:bg-[#003333] text-white font-semibold py-3.5 px-8 rounded-md transition-all duration-300 shadow-lg active:scale-95"
          >
            Explore Resources
          </button>
          <button
            type="button"
            onClick={() => setOpenInterview?.(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-semibold py-3.5 px-8 rounded-md transition-all duration-300 shadow-lg active:scale-95"
          >
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
}

