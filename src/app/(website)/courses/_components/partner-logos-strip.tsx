"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const INSTITUTIONS = [
  { name: "Harvard", sub: "Climate Programs" },
  { name: "Oxford", sub: "Smith School" },
  { name: "Stanford", sub: "Doerr Sustainability" },
  { name: "Cambridge", sub: "CISL Leadership" },
  { name: "Terra.do", sub: "Climate Academy" },
  { name: "Columbia", sub: "Climate School" },
];

export default function PartnerLogosStrip() {
  return (
    <section className="bg-white border-b border-gray-200 py-8 md:py-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-semibold mb-6">
          Curated in collaboration with leading universities &amp; climate academies
        </p>

        {/* Minimal, clean institutional badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {INSTITUTIONS.map((inst, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2.5 py-3 px-3 rounded-lg border border-gray-100 bg-[#F9FBFA] hover:bg-white hover:border-[#004242]/30 hover:shadow-sm transition-all text-center"
            >
              <GraduationCap className="w-4 h-4 text-[#004242] shrink-0" />
              <div className="text-left">
                <span className="block text-xs font-bold text-[#004242]">
                  {inst.name}
                </span>
                <span className="block text-[10px] text-gray-500">
                  {inst.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/educational-partners"
            className="text-xs text-[#004242] hover:text-[#006668] font-medium underline underline-offset-2 transition-colors"
          >
            Are you an academic institution? Partner with Act on Climate &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
