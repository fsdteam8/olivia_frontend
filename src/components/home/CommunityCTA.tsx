import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CommunityCTA = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/join.png")' }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl hero-font md:text-5xl font-normal text-white mb-6">
          Join our community
        </h2>
        <p className="text-white/90 text-sm md:text-base font-medium mb-10 leading-relaxed">
          Be part of Act on Climate to connect with climate leaders, discover
          meaningful opportunities, and accelerate your impact in building a
          more sustainable future.
        </p>
        <Link
          href={`https://5sovtpfwgg0.typeform.com/intake?typeform-source=workonclimate.org`}
          target="_blank"
        >
          <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white px-10 h-10 rounded-md text-sm transition-all">
            Join Community
          </Button>
        </Link>
      </div>
    </section>
  );
};
