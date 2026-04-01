"use client";
import { Button } from "@/components/ui/button";

const ClimateJourneyBanner = () => {
  return (
    <section
      className="relative h-[550px] w-full flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/cliamte-journey.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-5xl hero-font tracking-tight">
          Choose Your Climate Journey
        </h1>

        {/* Subtext */}
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Join our community of climate advocates and start making an impact
          today. Access tools, networks, and resources designed for every stage
          of your advocacy.
        </p>

        {/* Reusable Button - Careful with margins to avoid "messing" layout */}
        <div className="space-x-5">
          <Button>Start Free Trial</Button>
          <Button className="bg-inherit border border-white hover:border-primary">
            Explore Membership Benefits
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClimateJourneyBanner;
