import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  return (
    <section
      style={{
        backgroundImage: 'url("/joinus.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] border-[60px] border-[#E8EFFF] rounded-full" />
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] border-[60px] border-[#E8EFFF] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] border-[60px] border-[#E8EFFF] rounded-full" /> */}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl  text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white/80 text-sm font-medium mb-12">
          Be the first to discover meaningful opportunities, community updates,
          and resources shaping a sustainable future.
        </p>

        {/* Input Group */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-lg">
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="border-none bg-transparent focus-visible:ring-0 text-slate-800 placeholder:text-slate-400 font-medium h-12"
          />
          <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white px-8 h-12 rounded-lg font-black text-sm uppercase tracking-wide">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};
