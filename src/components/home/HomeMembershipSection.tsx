"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const HomeMembershipSection = () => {
  const benefits = [
    {
      icon: <Briefcase className="w-5 h-5 text-[#008080]" />,
      title: "Curated Opportunities & Jobs",
      description:
        "Get early access to high-impact climate jobs, fellowships, grants, and tailored volunteer openings.",
      highlight: "Personalized matching",
    },
    {
      icon: <Users className="w-5 h-5 text-[#008080]" />,
      title: "Global Community & Mentorship",
      description:
        "Connect with 25,000+ changemakers, attend member-only networking sessions, and book 1-on-1 mentorship.",
      highlight: "Verified member network",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#008080]" />,
      title: "Education Partner Discounts",
      description:
        "Enjoy exclusive discounts and direct enrollment pathways with accredited climate academies and universities.",
      highlight: "Up to 30% course savings",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#008080]" />,
      title: "Unlimited AI Career Insights",
      description:
        "Unlock full, unlimited access to our Climate AI Assistant for continuous personalized career guidance.",
      highlight: "Priority AI features",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FBFA] border-y border-[#E3ECEC]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-[#008080]" />
            <span>Community &amp; Membership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#053535] hero-font tracking-tight mb-4">
            Our Membership &amp; What It Offers
          </h2>

          <p className="text-[#527977] text-base sm:text-lg leading-relaxed font-light">
            Whether you are taking your first steps or accelerating your career in sustainability, 
            our membership gives you the tools, network, and guidance to maximize your climate impact.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b, index) => (
            <Card
              key={index}
              className="border border-[#DCEBE8] bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 group hover:-translate-y-1"
            >
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAF4F3] group-hover:bg-[#004242] transition-colors flex items-center justify-center shrink-0">
                  <div className="group-hover:text-white transition-colors">
                    {b.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-semibold text-[#008080] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                    {b.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-[#053535] leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#527977] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Banner with CTAs */}
        <div className="rounded-2xl bg-[#004242] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to accelerate your climate career?
            </h3>
            <p className="text-sm text-slate-200 font-light">
              Explore membership pricing options and find the plan that fits your journey.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-teal-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Flexible Monthly &amp; Annual
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cancel Anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Community Access
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link href="/membership" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white/10 px-5 py-5 rounded-xl font-semibold text-xs"
              >
                Learn More
              </Button>
            </Link>
            <Link href="/membership-pricing" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#42B0A8] hover:bg-[#349890] text-[#053535] font-bold px-6 py-5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs group">
                <span>View Membership Pricing</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
