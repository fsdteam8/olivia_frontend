"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust import path as needed

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  duration: string;
  buttonText: string;
  features: string[];
  isHighlighted?: boolean;
  isDarkButton?: boolean;
  hasTrial?: boolean;
  billingType: string;
}

const PricingCards = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscription`,
      );
      const data = await res.json();
      return data;
    },
  });

  const subscriptionPlans = plans?.data;

  // Skeleton loading state
  if (isLoading) {
    return (
      <section id="pricing" className="bg-[#eef4f5] py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 flex flex-col border-2 border-transparent"
            >
              <div className="mb-6">
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-10 w-40" />
              </div>

              <Skeleton className="w-full h-12 rounded-lg mb-8" />

              <div className="flex-grow">
                <Skeleton className="h-4 w-24 mb-4" />
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Skeleton className="w-4 h-4 rounded-full shrink-0 mt-0.5" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="bg-[#eef4f5] py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {subscriptionPlans?.map((plan: PricingPlan, index: number) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl p-8 flex flex-col border-2 ${
              plan.isHighlighted
                ? "border-[#064E4B] scale-105 z-10"
                : "border-transparent"
            }`}
          >
            {plan.isHighlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#064E4B] text-white text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl text-[#064E4B] mb-2">{plan.title}</h3>
              <p className="text-xs text-[#528B8A] leading-relaxed min-h-[40px]">
                {plan.description}
              </p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-[#064E4B]">
                ${plan?.price}/
              </span>
              <span className="text-sm">{plan?.billingType}</span>
              <span className="text-sm text-[#528B8A]">{plan?.duration}</span>
            </div>

            <button
              className={`w-full py-3 rounded-lg cursor-pointer font-semibold text-sm mb-8 transition-colors border ${
                plan?.hasTrial === true
                  ? "bg-[#064E4B] text-white border-[#064E4B] hover:bg-[#043331]"
                  : "bg-white text-[#064E4B] border-2 border-[#064E4B] hover:bg-slate-50"
              }`}
            >
              {plan.hasTrial === true ? "Start Free Trial" : "Get Started"}
            </button>

            <div className="flex-grow">
              <p className="text-sm text-[#064E4B] mb-4">What you get:</p>
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs text-[#528B8A] leading-tight"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#5d8aa8] shrink-0 mt-0.5" />
                    <span className="text-black">{feature}</span>
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
