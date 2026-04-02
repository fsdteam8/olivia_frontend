// components/SubmitBlogBanner.tsx
import React from "react";

const SubmitBlogBanner = () => {
  return (
    <section className="relative w-full bg-white py-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
      {/* Background Decorative Rings - Left */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 opacity-40 pointer-events-none hidden md:block">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="200" r="200" stroke="#F1F5F9" strokeWidth="60" />
          <circle cx="100" cy="200" r="280" stroke="#F1F5F9" strokeWidth="40" />
        </svg>
      </div>

      {/* Background Decorative Rings - Right */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-40 pointer-events-none hidden md:block">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="200" r="200" stroke="#F1F5F9" strokeWidth="60" />
          <circle cx="300" cy="200" r="280" stroke="#F1F5F9" strokeWidth="40" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-[#004242] text-4xl md:text-5xl font-normal tracking-tight mb-4">
          Submit a Blog for Us
        </h2>

        <p className="text-[#5D8AA8] text-lg md:text-xl  leading-relaxed mb-8 px-4">
          Act on Climate is looking for experts who want to write blog posts for
          us on a whole range of climate topics.
        </p>

        <button className="bg-[#004242] hover:bg-[#003333] text-white px-8 py-3 rounded-md  text-sm transition-colors duration-200 mb-6">
          Submit here
        </button>

        <p className="text-[#94a3b8] text-sm md:text-base font-medium">
          Share your expertise. Inspire climate action.
        </p>
      </div>
    </section>
  );
};

export default SubmitBlogBanner;
