import React from "react";
import { User, Search, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: <User className="w-6 h-6 text-slate-700" />,
    title: "Create Profile",
    description:
      "Tell us about your skills, interests, and location to get personalized recommendations.",
  },
  {
    icon: <Search className="w-6 h-6 text-slate-700" />,
    title: "Discover Opportunities",
    description:
      "Our AI matches you with the perfect jobs, volunteer opportunities, and local events.",
  },
  {
    icon: <Rocket className="w-6 h-6 text-slate-700" />,
    title: "Take Action",
    description:
      "Apply, attend, or organize. Track your impact and share your progress with the community.",
  },
];

export const HowItWorks = () => {
  return (
    <section className=" bg-[#EEF4F5]">
      <div className="container text-center py-[100px]">
        {/* Section Heading */}
        <h2 className="text-[28px]  text-[#004242] mb-4">How It Works</h2>
        <p className="text-slate-500 text-sm mb-16 font-medium">
          Start your climate journey in three simple steps. No complications,
          just action.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-12 rounded-[32px] border-none shadow-sm flex flex-col items-center text-center bg-white"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl  text-[#0D3B3F] ">{step.title}</h3>
              <p className="text-sm text-[#5D8AA8] leading-relaxed font-medium px-4">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
