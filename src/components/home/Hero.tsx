import React from "react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative h-[900px] flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0   bg-cover z-0"
        style={{ backgroundImage: 'url("/hero.jpeg")' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.60)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-white">
        <h4 className="text-5xl hero-font  md:text-6xl font-bold leading-tight mb-6">
          Connecting People to Climate Careers & Opportunities
        </h4>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Act on Climate is a global platform dedicated to connecting
          individuals with meaningful careers, resources, and opportunities in
          the climate space.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-[#004242] hover:bg-[#006668] text-white px-8 h-12 rounded-md font-bold text-sm min-w-[160px]">
            Join Community
          </Button>
          <Button
            variant="outline"
            className="border-white  text-white bg-transparent hover:text-white hover:bg-white/10 px-8 h-12 rounded-md font-bold text-sm min-w-[160px]"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};
