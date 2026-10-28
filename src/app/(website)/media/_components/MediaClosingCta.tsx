"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function MediaClosingCta() {
  return (
    <section className="bg-[#003838] text-white py-24 px-6 relative overflow-hidden">
      {/* Subtle background glow/circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#004d4d]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm text-gray-200">
          <Sparkles size={14} className="text-emerald-400" />
          Take the Next Step
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Be Part of the Change
        </h2>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Stay connected to the ideas, people, and opportunities moving climate
          action forward. Explore our resources, learn from the community, and
          find your next step.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/find-your-opportunity">
            <Button className="bg-white hover:bg-slate-100 text-[#003838] font-bold px-8 py-6 rounded-lg text-sm shadow-xl transition-all active:scale-[0.98] inline-flex items-center gap-2">
              <span>Explore Climate Opportunities</span>
              <ArrowRight size={16} />
            </Button>
          </Link>

          <Link href="/membership-pricing">
            <Button
              variant="outline"
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-6 rounded-lg text-sm transition-all active:scale-[0.98]"
            >
              Join the Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

