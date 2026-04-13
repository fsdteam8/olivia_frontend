import React from "react";
import { Briefcase, Users, Heart } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Grow Your Climate Career",
      description:
        "Get curated climate job openings, internships, and career resources designed to help you grow in the climate space.",
      icon: <Briefcase className="w-6 h-6 text-[#004D4D]" />,
    },
    {
      title: "Expand Your Network",
      description:
        "Receive invitations to members-only events, skill-building workshops, and meaningful networking sessions.",
      icon: <Users className="w-6 h-6 text-[#004D4D]" />,
    },
    {
      title: "Accelerate Your Impact",
      description:
        "Become part of a global community of professionals and changemakers working together to accelerate climate impact.",
      icon: <Heart className="w-6 h-6 text-[#004D4D]" />,
    },
  ];

  return (
    <section>
      <div className="container max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#004D4D] leading-tight max-w-3xl mx-auto">
            What Are the Benefits of Joining the Act on Climate Community?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] p-10 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-[#eef4f4] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#004D4D]/10 transition-colors">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl  text-[#004D4D] mb-4">{benefit.title}</h3>

              {/* Description */}
              <p className="text-slate-500 text-[15px] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
