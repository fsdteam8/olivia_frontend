"use client";
import { Button } from "@/components/ui/button";

const PageHeader = () => {
  return (
    <section
      className="relative h-[580px] w-full flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/opportunity.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="space-y-6">
        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-5xl hero-font tracking-tight max-w-xl mx-auto ">
          Discover Climate Opportunities Powered by AI
        </h1>

        {/* Subtext */}
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
          Connect with meaningful jobs, fellowships, events, and resources in
          the climate space guided by intelligent matching tailored to your
          goals. Start exploring for free and unlock deeper personalized
          insights as you grow.
        </p>

        <div className="space-x-4">
          <Button className="h-[50px] font-bold">
            Start with AI Assistant
          </Button>
          <Button className="h-[50px] font-bold bg-inherit border hover:bg-inherit">
            Browse Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
