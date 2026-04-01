import React from "react";

interface ComparisonRow {
  feature: string;
  nonMember: string;
  beginner: string;
  monthly: string;
  yearly: string;
  isMonthlyHighlighted?: boolean;
  isYearlyHighlighted?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Community Access",
    nonMember: "Limited",
    beginner: "Full",
    monthly: "Full",
    yearly: "Full",
  },
  {
    feature: "Resources",
    nonMember: "Basic",
    beginner: "Standard",
    monthly: "Premium",
    yearly: "Premium",
  },
  {
    feature: "Events",
    nonMember: "Paid",
    beginner: "10% Off",
    monthly: "Free",
    yearly: "Free",
    isMonthlyHighlighted: true,
  },
  {
    feature: "Courses",
    nonMember: "Full Price",
    beginner: "10% Off",
    monthly: "Free",
    yearly: "Included",
    isYearlyHighlighted: true,
  },
  {
    feature: "Career Services",
    nonMember: "Full Price",
    beginner: "10% Off",
    monthly: "Free",
    yearly: "Priority",
    isYearlyHighlighted: true,
  },
  {
    feature: "AI Chatbot",
    nonMember: "Full Price",
    beginner: "10% Off",
    monthly: "Free",
    yearly: "Unlimited",
    isYearlyHighlighted: true,
  },
];

const ComparePlans = () => {
  return (
    <section>
      <div className="container mx-auto">
        <h2 className="text-4xl text-[#064E4B] mb-10">Compare Plans</h2>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  <th className="p-6 text-lg font-bold text-[#064E4B] w-1/4">
                    Feature
                  </th>
                  <th className="p-6 text-lg font-bold text-[#064E4B]">
                    Non-Member
                  </th>
                  <th className="p-6 text-lg font-bold text-[#064E4B]">
                    Beginner
                  </th>
                  <th className="p-6 text-lg font-bold text-[#064E4B]">
                    Monthly
                  </th>
                  <th className="p-6 text-lg font-bold text-[#064E4B]">
                    Yearly
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="p-6 text-[#064E4B] font-medium text-sm md:text-base">
                      {row.feature}
                    </td>
                    <td className="p-6 text-[#528B8A] text-sm md:text-base">
                      {row.nonMember}
                    </td>
                    <td className="p-6 text-[#528B8A] text-sm md:text-base">
                      {row.beginner}
                    </td>
                    <td
                      className={`p-6 text-sm md:text-base font-bold ${row.isMonthlyHighlighted ? "text-[#064E4B]" : "text-[#528B8A]"}`}
                    >
                      {row.monthly}
                    </td>
                    <td
                      className={`p-6 text-sm md:text-base font-bold ${row.isYearlyHighlighted || row.feature === "Yearly" ? "text-[#064E4B]" : "text-[#528B8A]"}`}
                    >
                      {row.yearly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparePlans;
