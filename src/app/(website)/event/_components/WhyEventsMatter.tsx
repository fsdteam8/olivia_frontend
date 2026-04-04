import React from "react";
import Image from "next/image";

const WhyEventsMatter = () => {
  return (
    <section className="bg-[#EEF4F5] py-20 px-6 md:px-12 lg:px-24">
      <div className="container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side: Image Container */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/2] w-full rounded-[2rem] overflow-hidden shadow-sm border-[12px] border-white">
            <Image
              src="/event.jpg" // Replaced with a high-quality event staff placeholder
              alt="Event professional with radio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-[#004242] text-3xl md:text-4xl lg:text-[40px]  tracking-tight">
            Why Our Events Matter
          </h2>

          <div className="space-y-4 text-[#4A5565] text-sm md:text-base leading-relaxed font-medium">
            <p>
              Act on Climate events are designed to connect mission-driven
              professionals with practical insights, career opportunities, and
              meaningful collaborations. From expert panels to hands-on
              workshops, every event is built to move climate work forward.
            </p>
            <p>
              Act on Climate events are designed to connect mission-driven
              professionals with practical insights, career opportunities, and
              meaningful collaborations. From expert panels to hands-on
              workshops, every event is built to move climate work forward.
            </p>
            <p>
              Act on Climate events are designed to connect mission-driven
              professionals with practical insights, career opportunities, and
              meaningful collaborations. From expert panels to hands-on
              workshops, every event is built to move climate work forward.
            </p>
            <p>
              Act on Climate events are designed to connect mission-driven
              professionals with practical insights, career opportunities, and
              meaningful collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEventsMatter;
