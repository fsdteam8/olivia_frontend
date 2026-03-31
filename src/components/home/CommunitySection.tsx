import Image from "next/image";
import React from "react";

const CommunitySection = () => {
  return (
    <section className="bg-[#EEF4F5] md:px-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Map Graphic */}
        <div className="flex justify-center">
          <Image
            width={500}
            height={300}
            src="/Map.png"
            alt="World Map"
            className="w-full h-auto opacity-40 grayscale"
          />
        </div>

        {/* Right Side: Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl  text-[#004242] leading-tight">
            Join the Community <br /> Connecting Climate Careers
          </h2>
          <p className="text-[#5D8AA8] text-[18px leading-relaxed">
            Our team of AI specialists brings a wealth of experience in
            developing and implementing AI solutions across various industries.
            Learn more about the experts who will be helping you harness the
            power of AI.
          </p>
          <button className="bg-[#003d3d] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002b2b] transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
