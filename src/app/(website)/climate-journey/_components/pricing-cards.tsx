import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  duration: string;
  buttonText: string;
  features: string[];
  isPopular?: boolean;
  isDarkButton?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Beginner",
    description:
      "Perfect for individuals starting their climate action journey.",
    price: "$4",
    duration: "/month",
    buttonText: "Get Started",
    features: [
      "MightyNetworks access",
      "Basic climate resources",
      "10% partner discounts",
      "Students, early career professionals, and interested climate enthusiasts",
    ],
  },
  {
    name: "Monthly",
    description: "Advanced tools for active community members and leaders.",
    price: "$15",
    duration: "/month",
    buttonText: "Start Free Trial",
    isPopular: true,
    isDarkButton: true,
    features: [
      "All Beginner features",
      "Free events & workshops",
      "Career services access",
      "Standard AI chatbot access",
      "Perfect for emerging climate leaders, individuals pivoting to the climate space, and climate advocates",
    ],
  },
  {
    name: "Yearly",
    description: "Full access with significant savings for long-term impact.",
    price: "$50",
    duration: "/year",
    buttonText: "Get Best Value",
    features: [
      "MightyNetworks access",
      "Basic climate resources",
      "10% partner discounts",
      "Perfect for Climate advocates and professionals committed to long-term sustainability careers and deep involvement.",
    ],
  },
];

const PricingCards = () => {
  return (
    <section className="bg-[#EDF5F4] py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl p-8 flex flex-col shadow-sm border-2 ${
              plan.isPopular
                ? "border-[#064E4B] scale-105 z-10"
                : "border-transparent"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#064E4B] text-white text-[10px]  uppercase tracking-widest py-1.5 px-4 rounded-full">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl text-[#064E4B] mb-2">{plan.name}</h3>
              <p className="text-xs text-[#528B8A] leading-relaxed min-h-[40px]">
                {plan.description}
              </p>
            </div>

            <div className="mb-6">
              <span className="text-3xl  text-[#064E4B]">{plan.price}</span>
              <span className="text-sm text-[#528B8A]">{plan.duration}</span>
            </div>

            <button
              className={`w-full py-3 rounded-lg  text-sm mb-8 transition-colors border ${
                plan.isDarkButton
                  ? "bg-[#064E4B] text-white border-[#064E4B] hover:bg-[#043331]"
                  : "bg-white text-[#064E4B] border-[#064E4B] hover:bg-slate-50"
              }`}
            >
              {plan.buttonText}
            </button>

            <div className="flex-grow">
              <p className="text-sm  text-[#064E4B] mb-4">What you get:</p>
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs text-[#528B8A] leading-tight"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#42B0A8] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingCards;
