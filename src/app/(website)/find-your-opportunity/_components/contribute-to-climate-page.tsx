import React from "react";
import { Target, Zap, Users, Info, ChevronDown } from "lucide-react";

// Common style definitions to reduce repetition
const FORM_LABEL_STYLE = "text-sm  text-slate-700 mb-1.5 block";
const FORM_INPUT_STYLE =
  "w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#003D3D] focus:border-[#003D3D] focus:bg-white transition-all outline-none bg-slate-50";

export default function ContributeToClimatePage() {
  return (
    <div className="min-h-screen bg-[#F4F9F9] font-sans text-[#003D3D]">
      <main className="container py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* =========================================
           LEFT COLUMN: Value Propositions
           ========================================= */}
        <div className="space-y-12">
          {/* Header Texts */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl  text-[#004D4D] tracking-tight leading-tight">
              Contribute to the Climate Ecosystem
            </h1>
            <p className="text-slate-600 max-w-lg leading-relaxed text-[15px]">
              Submit a climate job, fellowship, event, or resource to help
              expand access across the community. All submissions are reviewed
              and integrated into the AI system to ensure relevant matching.
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="space-y-6">
            {/* Card 1: Target Icon */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0 mt-1">
                <Target className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h3 className=" text-[15px]">Reviewed by Our Team</h3>
                <p className="text-sm text-slate-500 leading-snug">
                  Every submission is manually reviewed to ensure quality and
                  relevance to the climate community.
                </p>
              </div>
            </div>

            {/* Card 2: Zap Icon */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0 mt-1">
                <Zap className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h3 className=" text-[15px]">AI-Integrated Matching</h3>
                <p className="text-sm text-slate-500 leading-snug">
                  Approved submissions are fed into our AI system to improve
                  personalized recommendations for all users.
                </p>
              </div>
            </div>

            {/* Card 3: Users Icon */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0 mt-1">
                <Users className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h3 className=" text-[15px]">Reach the Right People</h3>
                <p className="text-sm text-slate-500 leading-snug">
                  Your opportunity reaches thousands of climate professionals
                  actively seeking their next role or resource.
                </p>
              </div>
            </div>

            {/* Card 4: Info Icon */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0 mt-1">
                <Info className="w-5 h-5 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h3 className=" text-[15px]">Quick Submission</h3>
                <p className="text-sm text-slate-500 leading-snug">
                  Most submissions take under 3 minutes to complete. Our team
                  reviews within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
           RIGHT COLUMN: Submission Form
           ========================================= */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-xl  mb-8 text-[#004D4D]">
            Submit an Opportunity
          </h2>

          <form className="space-y-6">
            {/* Opportunity Title */}
            <div>
              <label htmlFor="title" className={FORM_LABEL_STYLE}>
                Opportunity Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Climate Policy Analyst"
                className={FORM_INPUT_STYLE}
              />
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="organization" className={FORM_LABEL_STYLE}>
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                placeholder="e.g. World Resources Institute"
                className={FORM_INPUT_STYLE}
              />
            </div>

            {/* Split Row: Type & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opportunity Type Dropdown */}
              <div>
                <label htmlFor="type" className={FORM_LABEL_STYLE}>
                  Opportunity Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    className={`${FORM_INPUT_STYLE} appearance-none pr-10 text-slate-500`}
                  >
                    <option value="" disabled selected>
                      Select type
                    </option>
                    <option value="job">Job</option>
                    <option value="fellowship">Fellowship</option>
                    <option value="event">Event</option>
                    <option value="resource">Resource</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {/* Location Input */}
              <div>
                <label htmlFor="location" className={FORM_LABEL_STYLE}>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="City, State or Remote"
                  className={FORM_INPUT_STYLE}
                />
              </div>
            </div>

            {/* Official Link */}
            <div>
              <label htmlFor="link" className={FORM_LABEL_STYLE}>
                Official Link
              </label>
              <input
                type="url"
                id="link"
                placeholder="https://example.com/opportunity"
                className={FORM_INPUT_STYLE}
              />
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="description" className={FORM_LABEL_STYLE}>
                Short Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Briefly describe the opportunity, requirements, and what makes it relevant to the climate community..."
                className={FORM_INPUT_STYLE}
              ></textarea>
              <p className="text-right text-[11px] text-slate-400 mt-1.5">
                Max 300 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#003D3D] text-white py-4 rounded-xl  text-lg hover:bg-[#002D2D] shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                Submit Opportunity
              </button>
            </div>

            {/* Footer Disclaimer */}
            <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
              By submitting, you agree to our community guidelines. All
              submissions are reviewed within 48 hours.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
