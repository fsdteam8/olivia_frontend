import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const offers = [
  {
    title: "Careers & Resources",
    description:
      "Explore climate careers, opportunities, and curated resources designed to support your growth and impact.",
    image:
      "/whatweoffer1.jpg", // Meeting/Collaboration
  },
  {
    title: "Events & Networking",
    description:
      "Join events, connect with like-minded individuals, and grow your network in the climate space.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", // Conference/Audience
  },
  {
    title: "Community & Support",
    description:
      "Access a trusted network of peers, mentors, and support systems built for climate impact.",
    image:
      "/whatweoffer3.jpg", // Volunteer/Outdoor event
  },
];

export const WhatWeOffer = () => {
  return (
    <section className="">
      <div className="container">
        {/* Section Header */}
        <h2 className="text-4xl  text-[#0D3B3F] text-center mb-16">
          What We Offer
        </h2>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <Card
              key={index}
              className="overflow-hidden py-0 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[20px]"
            >
              {/* Image Header */}
              <div className="h-56 w-full overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <CardContent className="py-4  bg-white">
                <h3 className="text-xl  text-[#004242] mb-4">{offer.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {offer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
