"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareText, Sparkles, ArrowRight, Bot, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIChatHighlight = () => {
  return (
    <section className="relative overflow-hidden py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#003D3D] via-[#053535] to-[#0D2E2E] p-8 sm:p-12 lg:p-14 text-white shadow-xl overflow-hidden border border-[#005555]">
          {/* Subtle background glow effects */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#008080]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#42B0A8]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#6CE5D8] text-xs font-semibold tracking-wide backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive AI Chat Board</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold hero-font leading-tight text-white">
                Meet our Climate AI Assistant
              </h2>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                Have questions about transitioning into sustainability, finding climate jobs, or funding opportunities? 
                Chat directly with our intelligent AI Assistant for real-time guidance tailored to your specific goals and background.
              </p>

              {/* Sample prompts / tags */}
              <div className="pt-1">
                <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2.5">
                  Popular questions you can ask:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/10 hover:bg-white/15 transition-colors px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                    &quot;How do I transition from software engineering to climate tech?&quot;
                  </span>
                  <span className="text-xs bg-white/10 hover:bg-white/15 transition-colors px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                    &quot;What are top renewable energy fellowships?&quot;
                  </span>
                  <span className="text-xs bg-white/10 hover:bg-white/15 transition-colors px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                    &quot;Find entry-level sustainability roles&quot;
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
                <Link href="/find-your-opportunity#chat-header" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#42B0A8] hover:bg-[#349890] text-[#053535] font-bold px-6 py-5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm group">
                    <MessageSquareText className="w-4 h-4" />
                    <span>Try the AI Chat Board</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/find-your-opportunity" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border border-white/30 text-white bg-white/5 hover:bg-white/15 px-6 py-5 rounded-xl font-medium text-sm transition-all"
                  >
                    <Compass className="w-4 h-4 mr-2" />
                    Browse All Opportunities
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual: Chat Simulation Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl border border-white/40 text-slate-800 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#003D3D] text-[#6CE5D8]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#053535]">Climate AI Assistant</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] text-slate-500 font-medium">Online · Ready to help</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    Live
                  </span>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-3 text-xs leading-relaxed">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#004242] text-white px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                      How can Act on Climate help me pivot my career into renewable energy?
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      AI
                    </div>
                    <div className="bg-slate-100 text-slate-700 p-3 rounded-2xl rounded-tl-sm space-y-1.5 shadow-sm">
                      <p>
                        Welcome! Here are 3 immediate ways you can start:
                      </p>
                      <ul className="space-y-1 text-[11px]">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Create a profile to get curated job recommendations.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Explore accredited courses from our Education Partners.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Join our community membership to network with mentors.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Prompt bar preview */}
                <Link href="/find-your-opportunity#chat-header" className="block pt-1">
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:border-teal-400 transition-colors cursor-pointer text-xs">
                    <span>Ask a question about climate careers...</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
