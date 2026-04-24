import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Briefcase, Users2 } from "lucide-react";

const MembershipSection = () => {
  const tiers = [
    {
      title: "Aspiring climate professionals",
      description: "Break into climate and find opportunities",
      icon: <Rocket className="w-6 h-6 text-[#063b3d]" />,
    },
    {
      title: "Career switchers",
      description: "Transitioning into climate and needing the right network",
      icon: <Briefcase className="w-6 h-6 text-[#063b3d]" />,
    },
    {
      title: "Current climate professionals",
      description: "Wanting to grow their connections, visibility, and impact",
      icon: <Users2 className="w-6 h-6 text-[#063b3d]" />,
    },
  ];

  return (
    <section className="bg-[#EEF4F5] py-20 px-6 font-sans">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#004242] text-3xl md:text-[40px]  tracking-tight mb-4">
            Who our Membership is For
          </h2>
          <p className="text-[#367588] text-lg font-medium opacity-90">
            Built for individuals at every stage of their climate journey
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className="border-none rounded-[2rem] shadow-sm overflow-hidden"
            >
              <CardContent className="flex flex-col items-center text-center  bg-[#FFFFFF] h-full">
                {/* Icon Container */}
                <div className="w-14 h-14 bg-[#6B8F5E1A] border-4 border-[#FFFFFF] shadow-2xl rounded-full flex items-center justify-center mb-8">
                  {tier.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-[#004242] text-xl  leading-tight mb-4">
                  {tier.title}
                </h3>
                <p className="text-[#5D8AA8] text-sm md:text-base leading-relaxed">
                  {tier.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
