"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Expert {
  name: string;
  role: string;
  institution: string;
  image: string;
  quote: string;
  specialty: string;
}

const EXPERTS: Expert[] = [
  {
    name: "Dr. Maya Patel",
    role: "Energy Systems Architect",
    institution: "Stanford Energy Fellow",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote:
      "Deploying renewables at scale requires moving beyond theoretical models. Our courses teach hands-on grid modeling, battery storage economics, and interconnection.",
    specialty: "Clean Energy & Grid Modernization",
  },
  {
    name: "Marcus Vance",
    role: "Head of ESG & Carbon Accounting",
    institution: "Oxford Net Zero Initiative",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    quote:
      "Organizations are under unprecedented scrutiny to demonstrate real emissions reductions. We empower learners with audited GHG accounting frameworks.",
    specialty: "Carbon Accounting & Scope 1-3",
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Circular Innovation",
    institution: "Cambridge CISL Fellow",
    image: "/elena_rodriguez.png",
    quote:
      "Circular economy is not just recycling—it is fundamentally rethinking product architecture, material flows, and lifecycle supply chains to eliminate waste.",
    specialty: "Circular Economy & Material Science",
  },
];

export default function HearFromExperts() {
  return (
    <section className="bg-[#EDF2F2] py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004242] hero-font mb-3">
            Hear From the Experts
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Learn directly from climate scientists, veteran practitioners, and policy architects building scalable solutions today.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERTS.map((expert, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#004242]">
                      {expert.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {expert.role}
                    </p>
                    <span className="text-[11px] font-semibold text-[#008080]">
                      {expert.institution}
                    </span>
                  </div>
                </div>

                <div className="text-xs leading-relaxed text-gray-600 italic mb-4">
                  <Quote className="w-3.5 h-3.5 text-[#004242]/40 mb-1 inline mr-1" />
                  &ldquo;{expert.quote}&rdquo;
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span className="font-semibold text-[#004242]">Focus:</span>{" "}
                {expert.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
