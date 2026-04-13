import React from "react";
import { Mail, Send, Sun, User } from "lucide-react";

// Reusable Card Component for the sidebar
const SidebarCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="mt-1 p-2 bg-slate-50 rounded-lg border border-slate-100">
      <Mail className="w-5 h-5 text-teal-700" />
    </div>
    <div>
      <h3 className=" text-slate-800 text-[15px]">{title}</h3>
      <p className="text-sm text-slate-500 leading-snug mt-1">{description}</p>
    </div>
  </div>
);

export default function ClimateCareerGuide() {
  return (
    <div className="min-h-screen bg-[#F4F9F9] p-6 md:p-20 font-sans text-slate-900">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl text-[#004D4D] tracking-tight">
          Your Personal Climate Career Guide
        </h1>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
          Our AI-powered assistant helps you navigate the climate ecosystem with
          clarity and confidence.
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Categories */}
        <div className="space-y-4">
          <SidebarCard
            title="Climate Jobs & Internships"
            description="Full-time, part-time, and internship roles across the climate sector"
          />
          <SidebarCard
            title="Fellowships & Funding"
            description="Grants, fellowships, and funding programs for climate professionals"
          />
          <SidebarCard
            title="Career Transition Pathways"
            description="Guided routes for professionals moving into the climate space"
          />
          <SidebarCard
            title="Skill-Building Resources"
            description="Courses, certifications, and learning materials for climate skills"
          />
          <SidebarCard
            title="Networking & Events"
            description="Conferences, meetups, and community events in the climate sector"
          />
        </div>

        {/* Right Column: AI Assistant Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-[#003D3D] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className=" text-sm">Climate AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[11px] text-slate-300">
                    Online · Ready to help
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-60 ">
              Free Access For Community
            </span>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
            {/* AI Message */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="shrink-0 p-1.5 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-slate-600" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Hello! I&apos;m your Climate Career AI. I can help you
                  discover jobs, fellowships, events, and resources tailored to
                  your goals. What are you looking for today?
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
              <div className="shrink-0 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="bg-[#003D3D] p-4 rounded-2xl rounded-tr-none text-white shadow-sm">
                <p className="text-sm">
                  I&apos;m a software engineer looking to transition into
                  climate tech. What opportunities are available?
                </p>
              </div>
            </div>

            {/* AI Response with Chips */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="shrink-0 p-1.5 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-slate-600" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm space-y-3">
                <p className="text-sm text-slate-700">
                  Great background for climate tech! Here are some strong
                  matches for you:
                </p>
                <div className="space-y-2">
                  {[
                    "Software Engineer @ ClimateAI — Remote",
                    "Tech Fellowship — Rocky Mountain Institute",
                    "Full-Stack Dev @ Carbon Direct — NYC",
                  ].map((job) => (
                    <div
                      key={job}
                      className="flex items-center gap-2 p-2 px-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-[13px]  hover:bg-emerald-100 cursor-pointer transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {job}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about climate opportunities, career paths, or skills..."
                className="w-full bg-slate-100 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all outline-none"
              />
              <button className="bg-[#004D4D] p-2.5 rounded-xl text-white hover:bg-[#003D3D] transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3">
              Free access · No account required to start
            </p>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <button className="bg-[#003D3D] text-white px-8 py-4 rounded-xl  text-lg hover:bg-[#002D2D] shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer">
          Start with AI Assistant
        </button>
      </div>
    </div>
  );
}
