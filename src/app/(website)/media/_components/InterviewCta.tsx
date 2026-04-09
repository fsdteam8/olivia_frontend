import React from "react";
import InterviewModal from "./InterviewModal";

export default function InterviewHero() {
  const [isInterviewModalOpen, setInterviewModalOpen] = React.useState(false);
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/interview.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl hero-font font-black mb-6 tracking-tight">
          Apply to do an Interview with Us
        </h1>

        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10 text-gray-200">
          Act on Climate is looking for experts who want to do in-depth
          interviews with us on a whole range of climate topics.
        </p>

        <button
          onClick={() => setInterviewModalOpen(true)}
          className="bg-[#00473e] hover:bg-[#00362f] text-white font-bold py-3 px-10 rounded-lg transition-all shadow-lg active:scale-95"
        >
          Apply now
        </button>
      </div>
      <InterviewModal
        isOpen={isInterviewModalOpen}
        setOpen={setInterviewModalOpen}
      />
    </section>
  );
}
