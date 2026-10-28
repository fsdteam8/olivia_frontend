"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SubmitBlogCTA = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-6 border-t border-slate-100">
      {/* Decorative Background Patterns */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full border-[40px] border-[#004242]" />
        <div className="w-[200px] h-[200px] rounded-full border-[30px] border-[#004242] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full border-[40px] border-[#004242]" />
        <div className="w-[200px] h-[200px] rounded-full border-[30px] border-[#004242] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#004242]/10 text-[#004242] text-xs font-bold uppercase tracking-wider">
          Contribute Content
        </span>

        <h2 className="text-[#004242] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Your Voice Belongs in the Climate Conversation
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Have a useful resource, an important perspective, or a story worth
          sharing? We&apos;re interested in connecting with people who want to
          educate, inspire, and support the climate community. Contribute your
          knowledge and help make climate information and opportunities more
          accessible.
        </p>

        <div className="pt-4">
          <Link href="/blog">
            <Button className="bg-[#004242] hover:bg-[#003333] text-white px-9 py-6 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] shadow-md hover:shadow-lg">
              Share Your Ideas
            </Button>
          </Link>
        </div>

        <p className="text-[#729094] text-xs font-semibold italic pt-2">
          Share your expertise. Inspire climate action.
        </p>
      </div>
    </section>
  );
};

export default SubmitBlogCTA;
