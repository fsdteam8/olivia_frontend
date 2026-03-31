import React from "react";
import Image from "next/image";
import { Calendar, User, Share2, Link2, Lightbulb, Mail } from "lucide-react";

const BlogDetails = () => {
  return (
    <div className=" min-h-screen pb-20">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#EEF4F5] pb-4">
        <div className="container px-4 pt-12">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" // Placeholder for forest image
              alt="Climate Tech Forest"
              fill
              className="object-cover"
            />
            {/* Overlay Tags */}
            <div className="absolute bottom-8 left-8 flex gap-3">
              <span className="bg-[#004242] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Resources
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-[#729094] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                Posted 2 days ago
              </span>
            </div>
          </div>

          {/* Post Meta */}
          <div className="mt-8 flex items-center gap-6 text-[#729094] text-sm font-medium">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>By Act on Climate Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>March 2026</span>
            </div>
          </div>

          <h1 className="mt-4 text-[#004242] text-4xl md:text-5xl  tracking-tight mb-12">
            Navigating the Future of Climate Tech Careers
          </h1>
        </div>
      </div>

      {/* --- CONTENT & SIDEBAR GRID --- */}
      <div className="container px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8  py-8 md:py-12 rounded-3xl  ">
          <section className="mb-10">
            <h2 className="text-[#004242] text-2xl  mb-4">The Tipping Point</h2>
            <p className="text-[#729094] leading-relaxed mb-6">
              As we stand at the threshold of a new era, the data from climate
              scientists worldwide has never been clearer. We are approaching
              tipping points that could lead to irreversible changes in the
              Earth&apos;s ecosystem. The melting of Arctic sea ice, the thawing
              of permafrost, and the acidification of our oceans are no longer
              distant threats—they are current realities.
            </p>
            <p className="text-[#729094] leading-relaxed">
              But this is not a message of despair. Rather, it is a call to
              action. The next ten years represent our &quot;decisive
              decade.&quot; The choices we make now regarding energy production,
              resource management, and global policy will resonate for
              centuries.
            </p>
          </section>

          {/* Blockquote */}
          <div className="bg-[#f1f5f9] border-l-4 border-[#004242] p-8 rounded-r-xl mb-12">
            <p className="text-[#004242] text-xl font-medium italic mb-4">
              &quot;We are the first generation to feel the effect of climate
              change and the last generation who can do something about
              it.&quot;
            </p>
            <span className="text-[#729094] font-bold">— Barack Obama</span>
          </div>

          <section className="mb-10">
            <h2 className="text-[#004242] text-2xl  mb-4">
              Individual Impact vs. Systemic Change
            </h2>
            <p className="text-[#729094] leading-relaxed mb-8">
              While much focus is placed on individual lifestyle changes, such
              as reducing plastic use or switching to electric vehicles, the
              most significant impact will come from systemic shifts.
            </p>

            {/* Sub-Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d"
                    alt="Wind Turbines"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest font-bold">
                  Transitioning to wind and solar energy is paramount.
                </p>
              </div>
              <div className="space-y-3">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
                    alt="Reforestation"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest font-bold">
                  Reforestation efforts are scaling globally.
                </p>
              </div>
            </div>

            <p className="text-[#729094] leading-relaxed">
              Legislative action to put a price on carbon, subsidies for
              renewable energy research, and international cooperation are the
              pillars of a sustainable future. We must hold corporations
              accountable while fostering an environment where green
              technologies can thrive.
            </p>
          </section>

          {/* Author Card */}
          <div className="mt-16 bg-[#f1f5f9] p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              {/* <Image src="https://i.pravatar.cc/150?u=olivia" alt="Olivia Krap" fill className="object-cover" /> */}
            </div>
            <div>
              <h4 className="text-[#004242] text-lg  mb-2">
                About Olivia Krap
              </h4>
              <p className="text-[#729094] text-sm leading-relaxed">
                Sarah is a climate researcher and environmental policy advocate
                with over 15 years of experience. She focuses on the
                intersection of technological innovation and ecological
                preservation. When she&apos;s not writing, she&apos;s usually
                exploring coastal ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="lg:col-span-4 mt-10 space-y-6">
          {/* Share Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <h5 className="text-[#729094] text-[10px] uppercase tracking-widest font-bold mb-4">
              Share this insight
            </h5>
            <div className="flex justify-center gap-4 text-[#729094]">
              <button className="p-2 hover:text-[#004242] transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:text-[#004242] transition-colors">
                <Mail size={20} />
              </button>
              <button className="p-2 hover:text-[#004242] transition-colors">
                <Link2 size={20} />
              </button>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 text-[#004242] mb-6">
              <Lightbulb size={24} strokeWidth={2.5} />
              <h5 className="text-lg font-bold">Key Takeaways</h5>
            </div>
            <ul className="space-y-4 text-xs font-medium text-[#729094]">
              <li className="flex gap-2">
                <span className="text-[#004242]">•</span>
                Climate tech is outperforming broader tech sector growth.
              </li>
              <li className="flex gap-2">
                <span className="text-[#004242]">•</span>
                Non-technical roles are equally vital for scaling solutions.
              </li>
              <li className="flex gap-2">
                <span className="text-[#004242]">•</span>
                Strategic networking is the #1 way to enter the field.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
