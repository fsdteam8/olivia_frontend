import React from "react";
import { Calendar, GraduationCap, Briefcase, Bot } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "Events",
    description: "Live sessions and global climate summits.",
    icon: <Calendar className="w-5 h-5 text-[#064E4B]" />,
  },
  {
    title: "Courses",
    description: "Certified climate advocacy programs.",
    icon: <GraduationCap className="w-5 h-5 text-[#064E4B]" />,
  },
  {
    title: "Career Services",
    description: "Job matching and portfolio reviews.",
    icon: <Briefcase className="w-5 h-5 text-[#064E4B]" />,
  },
  {
    title: "AI Chatbot",
    description: "24/7 climate science data assistant.",
    icon: <Bot className="w-5 h-5 text-[#064E4B]" />,
  },
];

const SpecificServicePricing = () => {
  return (
    <section className="bg-[#EDF5F4] py-16">
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl text-[#064E4B] text-center mb-16">
          Specific Service Pricing
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-start hover:translate-y-[-4px] transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#E6F2F1] rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl text-[#064E4B] mb-3 hero-font">
                {service.title}
              </h3>
              <p className="text-[#528B8A] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecificServicePricing;
