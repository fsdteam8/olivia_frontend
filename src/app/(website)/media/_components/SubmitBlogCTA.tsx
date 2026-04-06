import React from "react";
import { Button } from "@/components/ui/button";

const SubmitBlogCTA = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 px-6">
      {/* Decorative Background Patterns (Left and Right) */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full border-[40px] border-[#004242]" />
        <div className="w-[200px] h-[200px] rounded-full border-[30px] border-[#004242] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full border-[40px] border-[#004242]" />
        <div className="w-[200px] h-[200px] rounded-full border-[30px] border-[#004242] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <h2 className="text-[#004242] text-4xl md:text-5xl font-extrabold tracking-tight">
          Submit a Blog for Us
        </h2>

        <p className="text-[#729094] text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Act on Climate is looking for experts who want to write blog posts for
          us on a whole range of climate topics.
        </p>

        <div className="pt-4">
          <Button className="bg-[#004242] hover:bg-[#003333] text-white px-10 py-6 rounded-lg  text-sm transition-all active:scale-[0.98]">
            Submit here
          </Button>
        </div>

        <p className="text-[#729094] text-xs font-semibold italic">
          Share your expertise. Inspire climate action.
        </p>
      </div>
    </section>
  );
};

export default SubmitBlogCTA;
