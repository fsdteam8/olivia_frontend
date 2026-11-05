"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerCTA() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#053535] via-[#004242] to-[#0D3B3F] p-8 sm:p-14 lg:p-20 text-white shadow-2xl overflow-hidden">
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#42B0A8]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#6CE5D9] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Become a Verified Educational Partner</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold hero-font leading-tight">
              Ready to Expand Your Institution&apos;s Climate Impact?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Join the Act on Climate Education Partnership Program and showcase your courses, certificates, workshops and training programs to people looking to build their climate and sustainability knowledge.
            </p>

            {/* Pricing Information Card */}
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center max-w-xl mx-auto space-y-1">
              <span className="text-base sm:text-lg font-extrabold text-[#6CE5D9] block">
                $150/year - 0% commission - Keep 100% of your course revenue
              </span>
              <span className="text-xs text-gray-200 block">
                No referral fees. No transaction fees. No percentage of your course sales.
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/survey/education-partner" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#6CE5D9] hover:bg-[#52D3C5] text-[#053535] px-8 py-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group">
                  <span>Become an Education Partner - $150/year</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="mailto:info@actonclimate.net" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/80 text-white bg-transparent hover:bg-white/10 px-8 py-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Talk to Partnerships Team</span>
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6CE5D9]" />
                <span>48-Hour Academic Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6CE5D9]" />
                <span>Direct Admissions Funnel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6CE5D9]" />
                <span>Dedicated Institutional Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

