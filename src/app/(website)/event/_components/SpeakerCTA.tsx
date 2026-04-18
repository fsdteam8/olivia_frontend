import React from "react";
import Image from "next/image";

const SpeakerCTA = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <section className="bg-[#f2f7f7] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
          <h2 className="text-[#004242] text-3xl md:text-4xl  tracking-tight">
            Interested in Being a Speaker?
          </h2>

          <div className="text-[#729094] text-sm md:text-base leading-relaxed font-medium space-y-4">
            <p>
              Act on Climate is looking for speakers to talk on a whole range of
              climate topics. If you are interested apply today!
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-[#004242] hover:bg-[#003333] text-white px-8 py-3 rounded-lg  text-sm transition-all active:scale-[0.98]"
          >
            Apply to Speak
          </button>
        </div>

        {/* Right Side: Image with White Frame */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="relative aspect-[5/3] w-full rounded-[2rem] overflow-hidden shadow-sm border-[10px] border-white">
            <Image
              src="/event1.jpg" // Speaker/Microphone placeholder
              alt="Speaker at climate event"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerCTA;
