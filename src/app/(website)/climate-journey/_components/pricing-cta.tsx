import React from "react";

const PricingCTA = () => {
  return (
    <section className="flex justify-center">
      <div className="relative w-full container bg-white rounded-[40px] p-12 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Decorative Background Element (Bottom Right) */}
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-5 select-none pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            fill="currentColor"
            className="text-[#064E4B]"
          >
            <path d="M100 0 L200 200 L0 200 Z" />
          </svg>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl md:text-4xl text-[#064E4B] tracking-tight">
            To learn more about our pricing and what we offer, click here.
          </h2>

          <p className="text-[#528B8A] text-sm md:text-base font-medium">
            Take out non-profits and keep discounts
          </p>

          <div className="pt-4">
            <button className="bg-[#064E4B] text-white px-8 py-3.5 rounded-xl  text-sm md:text-base hover:bg-[#043331] transition-all transform hover:scale-105">
              View Pricing Guide (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
