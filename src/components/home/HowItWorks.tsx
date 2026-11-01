import React from "react";
import Link from "next/link";
import { UserCheck, Search, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <UserCheck className="w-6 h-6 text-[#008080]" />,
    stepNumber: "01",
    title: "Create Your Profile",
    description:
      "Sign up in minutes and complete your profile. Share your skills, climate background, and goals to get discovered in our Member Directory.",
    actionText: "Create a Profile",
    actionLink: "/sign-up",
  },
  {
    icon: <Search className="w-6 h-6 text-[#008080]" />,
    stepNumber: "02",
    title: "Explore with AI & Matching",
    description:
      "Use our intelligent AI Chat Assistant and filters to discover tailored sustainability jobs, accredited courses, and partner programs.",
    actionText: "Try AI Assistant",
    actionLink: "/find-your-opportunity#chat-header",
  },
  {
    icon: <Rocket className="w-6 h-6 text-[#008080]" />,
    stepNumber: "03",
    title: "Connect & Take Action",
    description:
      "Apply directly to opportunities, book sessions with verified climate mentors, and collaborate with 25,000+ sustainability peers.",
    actionText: "Meet the Community",
    actionLink: "/meet-climate-people",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-[#EEF4F5] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-[#004242] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#008080]" />
            <span>Simple 3-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#004242] hero-font mb-3">
            How It Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light">
            Start your climate journey in three simple steps — from setting up your profile to discovering tailored opportunities.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 sm:p-10 rounded-[28px] border-none shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center bg-white group hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                {/* Step badge & icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#EAF4F3] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#004242] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0D3B3F] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5D8AA8] leading-relaxed font-normal mb-6">
                  {step.description}
                </p>
              </div>

              {/* Action Link Button */}
              <Link href={step.actionLink} className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-[#004242]/20 hover:border-[#004242] text-[#004242] hover:bg-[#004242] hover:text-white rounded-xl text-xs font-semibold py-5 transition-all group/btn flex items-center justify-center gap-1.5"
                >
                  <span>{step.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Informational Callout */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white/70 border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-[#004242]">Already have an account?</span>
            <p className="text-slate-500 mt-0.5">
              Log in to your dashboard and use <strong className="text-slate-700">Promote Me</strong> to update your public profile anytime.
            </p>
          </div>
          <Link href="/login" className="shrink-0">
            <span className="font-semibold text-[#004242] hover:underline underline-offset-4">
              Sign In to Your Dashboard →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
