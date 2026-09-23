import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const FAQSection = () => {
  const faqCategories: FAQCategory[] = [
    {
      category: "Membership",
      items: [
        {
          question: "Who can join Act on Climate?",
          answer:
            "Anyone interested in climate, sustainability, climate careers or taking action can join.",
        },
        {
          question: "Do I need to work in climate to become a member?",
          answer:
            "No. Our community is for people at every stage of their climate journey.",
        },
        {
          question: "What's the difference between the membership levels?",
          answer: (
            <div className="space-y-2">
              <p>
                <strong className="text-[#004242] font-semibold">Explore</strong>{" "}
                is designed for people who want to explore and connect.
              </p>
              <p>
                <strong className="text-[#004242] font-semibold">
                  Climate Career
                </strong>{" "}
                is designed for people actively developing their climate career.
              </p>
              <p>
                <strong className="text-[#004242] font-semibold">
                  Climate Commitment
                </strong>{" "}
                is designed for members who want longer-term engagement.
              </p>
              <p>
                <strong className="text-[#004242] font-semibold">
                  Founding Member
                </strong>{" "}
                is a limited opportunity for the first 100–150 members.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      category: "Education",
      items: [
        {
          question: "Are courses included with membership?",
          answer:
            "No. Courses are offered separately by Education Partners. Each provider sets their own pricing.",
        },
        {
          question: "Can non-members purchase courses?",
          answer:
            "Yes. Courses can be made available to anyone according to the Education Partner's terms.",
        },
      ],
    },
    {
      category: "Career Services",
      items: [
        {
          question: "Do I need to be a member to use Career Services?",
          answer:
            "As an Act on Climate member, you get access to career support as part of your membership including the opportunity to connect with and receive support from other members of the community. For those who do not want to purchase our membership and career support through our community will need to pay.",
        },
        {
          question: "Can I book a free consultation?",
          answer:
            "Yes. If you're unsure which career service is right for you, you can book a free consultation.",
        },
      ],
    },
    {
      category: "Professional Profiles",
      items: [
        {
          question: "Do I have to create a professional profile?",
          answer: "No. Creating a professional profile is optional.",
        },
        {
          question: "Who can see my profile?",
          answer:
            "You control your profile visibility and what information you choose to share.",
        },
      ],
    },
  ];

  return (
    <section className="bg-[#EEF4F5] py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h2 className="text-[#063b3d] text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQ Categories & Accordion */}
        <Accordion type="single" collapsible className="space-y-10 w-full">
          {faqCategories.map((categoryGroup, catIndex) => (
            <div key={catIndex} className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#42B0A8]" />
                <h3 className="text-lg md:text-xl font-bold text-[#004242] uppercase tracking-wider">
                  {categoryGroup.category}
                </h3>
              </div>

              <div className="space-y-3">
                {categoryGroup.items.map((faq, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`item-${catIndex}-${itemIndex}`}
                    className="bg-white border-none rounded-2xl overflow-hidden px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-[#004242] cursor-pointer text-base md:text-[18px] font-semibold text-left py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#2c4e4e] text-[15px] md:text-[16px] leading-relaxed pb-6 border-t border-[#f0f7f9] pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </div>
          ))}
        </Accordion>

        {/* Footer / Contact Section */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-[#111827] font-medium">Still have questions?</p>
          <Link href="mailto:info@actonclimate.net">
            <Button className="bg-[#004242] hover:bg-[#042a2b] text-white font-bold px-8 py-6 rounded-lg transition-colors cursor-pointer">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
