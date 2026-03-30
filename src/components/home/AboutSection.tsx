import Image from "next/image";
import React from "react";

export const AboutSection = () => {
  return (
    <section className=" py-[100px] bg-[#EEF4F5] flex items-center justify-center">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image Container */}
        <div className="rounded-[24px] overflow-hidden border-[8px] border-white shadow-sm w-[500px] h-[380px]">
          <Image
            width={500}
            height={380}
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
            alt="Collaborative work"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="pt-4">
          <h2 className="text-[32px] font-black text-[#0D3B3F] mb-6">
            What We Are About
          </h2>
          <p className="text-[14px] leading-[1.8] text-slate-500 font-medium text-justify">
            Act on Climate is a climate focused platform that connects people to
            jobs, events, and resources within the climate sector. It helps
            individuals build skills, expand their network, and take meaningful
            action toward climate solutions. Act on Climate is a climate focused
            platform that connects people to jobs, events, and resources within
            the climate sector. It helps individuals build skills, expand their
            network, and take meaningful action toward climate solutions. Act on
            Climate is a climate focused platform that connects people to jobs,
            events, and resources within the climate sector. It helps
            individuals build skills, expand their network, and take meaningful
            action toward climate solutions.
          </p>
        </div>
      </div>
    </section>
  );
};
