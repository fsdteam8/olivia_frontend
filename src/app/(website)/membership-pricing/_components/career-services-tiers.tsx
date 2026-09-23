import React from "react";
import {
  Briefcase,
  CheckCircle2,
  Star,
  Users,
  UserCheck,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isFeatured?: boolean;
  bundleSummary?: string;
}

const CareerServicesTiers = () => {
  const individualServices: ServiceItem[] = [
    {
      id: "resume-review",
      name: "Resume & CV Review",
      price: "$49",
      description:
        "Practical feedback to strengthen your resume for climate and sustainability opportunities.",
      features: [
        "In-depth section-by-section review",
        "Climate industry keyword alignment",
        "Actionable feedback to stand out",
      ],
      ctaText: "Explore Career Services",
      ctaLink: "/career-services",
    },
    {
      id: "linkedin-review",
      name: "LinkedIn Profile Review",
      price: "$39",
      description:
        "Feedback to help you build a stronger professional presence.",
      features: [
        "Headline & summary optimization",
        "Climate positioning & visibility",
        "Profile presence & networking tips",
      ],
      ctaText: "Explore Career Services",
      ctaLink: "/career-services",
    },
    {
      id: "career-coaching",
      name: "Climate Career Coaching",
      price: "$75",
      description:
        "A 45-minute one-on-one session focused on your career goals and next steps.",
      features: [
        "45-minute 1-on-1 coaching session",
        "Personalized career goal alignment",
        "Tailored next steps & action plan",
      ],
      ctaText: "Explore Career Services",
      ctaLink: "/career-services",
    },
  ];

  const featuredBundle: ServiceItem = {
    id: "career-starter-bundle",
    name: "Career Starter Bundle",
    price: "$129",
    bundleSummary: "Resume + LinkedIn + 45-minute Career Coaching",
    description:
      "A complete package combining our three core career services for maximum impact.",
    features: [
      "Resume & CV Review",
      "LinkedIn Profile Review",
      "45-minute Career Coaching",
    ],
    ctaText: "Explore Career Services",
    ctaLink: "/career-services",
    isFeatured: true,
  };

  return (
    <section className="container mx-auto px-4 sm:px-6">
      {/* ─── Header & Positioning Message ──────────────────────────────── */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2F1] text-[#064E4B] text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5 text-[#064E4B]" />
          <span>Career Services</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064E4B] tracking-tight">
          Need individual career support?
        </h2>

        <p className="text-sm sm:text-base text-[#528B8A] leading-relaxed max-w-2xl mx-auto">
          Membership gives you access to career resources, opportunities and a
          climate-focused community. If you need more personalized support, you
          can purchase career services{" "}
          <strong className="text-[#064E4B] font-semibold">
            whether you&apos;re a member or not
          </strong>
          .
        </p>

        {/* Membership vs Career Services Distinction */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-[#F0F7F7] border border-[#D5E7E6] rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#064E4B] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#064E4B]">
                Membership Access
              </h3>
              <p className="text-xs text-[#528B8A] mt-1 leading-relaxed">
                Access to career resources, job opportunities, and climate
                community.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F7F7] border border-[#D5E7E6] rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#064E4B] text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#064E4B]">
                Individual Career Services
              </h3>
              <p className="text-xs text-[#528B8A] mt-1 leading-relaxed">
                Personalized 1-on-1 support available to both{" "}
                <span className="font-semibold text-[#064E4B]">
                  members &amp; non-members
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Services & Bundle Grid ───────────────────────────────────── */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Three Individual Service Cards */}
        {individualServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col border border-[#E2ECEB] shadow-sm hover:shadow-md hover:border-[#064E4B]/30 transition-all duration-300"
          >
            <div className="mb-5">
              <h3 className="text-xl font-bold text-[#064E4B] leading-snug min-h-[56px] flex items-center">
                {service.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#064E4B]">
                  {service.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#528B8A] leading-relaxed mb-6 min-h-[48px]">
              {service.description}
            </p>

            <div className="border-t border-slate-100 pt-5 flex-grow">
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#064E4B] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#42B0A8] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-auto">
              <Link href={service.ctaLink} className="block w-full">
                <button className="w-full bg-[#F0F7F7] hover:bg-[#064E4B] text-[#064E4B] hover:text-white border border-[#D5E7E6] hover:border-[#064E4B] py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group">
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        ))}

        {/* Featured Service: Career Starter Bundle */}
        <div className="relative bg-[#064E4B] text-white rounded-2xl p-6 sm:p-7 flex flex-col border-2 border-[#064E4B] shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Bundle Highlight Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#043331] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full border border-teal-500/40 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>Recommended Bundle</span>
          </div>

          <div className="mb-5 pt-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white leading-snug min-h-[56px] flex items-center">
                ⭐ {featuredBundle.name}
              </h3>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {featuredBundle.price}
              </span>
            </div>
          </div>

          <div className="mb-6 min-h-[48px]">
            <p className="text-xs font-semibold text-[#80D0C7] leading-relaxed">
              {featuredBundle.bundleSummary}
            </p>
            <p className="text-[11px] text-teal-100/80 leading-relaxed mt-1">
              {featuredBundle.description}
            </p>
          </div>

          <div className="border-t border-teal-600/50 pt-5 flex-grow">
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-200 mb-3">
              Included in this bundle:
            </p>
            <ul className="space-y-3">
              {featuredBundle.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-teal-50 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#80D0C7] shrink-0 mt-0.5" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 mt-auto">
            <Link href={featuredBundle.ctaLink} className="block w-full">
              <button className="w-full bg-white hover:bg-slate-100 text-[#064E4B] py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5 group">
                <span>{featuredBundle.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#064E4B] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Bottom Consultation CTA ──────────────────────────────────── */}
      <div className="mt-12 bg-[#F0F7F7] border border-[#D5E7E6] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#064E4B]">
            <Calendar className="w-3.5 h-3.5 text-[#42B0A8]" />
            <span>Personalized Guidance</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#064E4B]">
            Not sure what you need?
          </h3>
          <p className="text-xs sm:text-sm text-[#528B8A] leading-relaxed">
            Talk through your climate career goals with us to determine the best
            path forward and which service fits your current stage.
          </p>
        </div>

        <Link
          href="https://calendly.com/actonclimate-Info/30min?month=2026-04"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto bg-[#064E4B] hover:bg-[#043331] text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer">
            Book Your Free Consultation
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CareerServicesTiers;
