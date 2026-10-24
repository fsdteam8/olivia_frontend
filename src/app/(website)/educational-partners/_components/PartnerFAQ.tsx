"use client";

import React from "react";
import Link from "next/link";
import { Mail, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is the Act on Climate Educational Partners Program?",
    answer:
      "The Educational Partners Program is a dedicated initiative designed for universities, academic colleges, bootcamps, and training institutes to connect their climate, ESG, and sustainability curriculum with our global community of thousands of career changers, professionals, and jobseekers.",
  },
  {
    question: "What types of programs and courses can we list?",
    answer:
      "You can list all levels of climate education, including university undergraduate and master's degree programs, executive certificates, online cohort bootcamps, self-paced masterclasses, workshops, and specialized training programs covering topics like Clean Energy, Sustainable Finance, Carbon Accounting, Climate Policy, and Circular Economy.",
  },
  {
    question: "How do students enroll into our courses?",
    answer:
      "You maintain 100% control over student applications, admissions criteria, and tuition payments. Your course pages feature direct call-to-action buttons directing prospective students straight to your university or institution's official registration or application portal.",
  },
  {
    question: "Is there any cost to join as an Educational Partner?",
    answer:
      "We provide flexible partnership models. Institutions can apply to become verified partners and publish approved climate courses. For enhanced visibility—such as homepage spotlights, newsletter features, and priority search placement—we offer dedicated institutional sponsorship packages.",
  },
  {
    question: "How does the partner verification process work?",
    answer:
      "After completing our onboarding survey, our academic advisory committee verifies your institution's credentials, curriculum relevance, and instructor background. This review typically takes between 48 to 72 business hours, after which you receive access to your Partner Portal.",
  },
  {
    question: "Can we track performance, course views, and referral clicks?",
    answer:
      "Yes. Approved partners gain access to an intuitive Partner Dashboard providing live metrics on course page views, outbound application clicks, student geographic distribution, and overall engagement.",
  },
  {
    question: "Can an institution list multiple courses and different faculties?",
    answer:
      "Absolutely. A single institutional account can publish multiple programs across diverse departments (e.g., School of Business, Faculty of Environmental Science, Engineering Institute).",
  },
];

export default function PartnerFAQ() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F9F8] border-t border-[#E3ECEC] relative">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#008080]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#053535] hero-font leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#527977] max-w-2xl mx-auto">
            Everything you need to know about partnering with Act on Climate as an educational institution.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D5E6E4] shadow-sm">
          <Accordion type="single" collapsible className="space-y-4 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-[#EAF0F0] rounded-2xl px-5 sm:px-6 data-[state=open]:border-[#42B0A8]/50 data-[state=open]:bg-[#F8FBFA] transition-colors"
              >
                <AccordionTrigger className="text-[#053535] hover:text-[#008080] text-left text-sm sm:text-base font-semibold py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#527977] text-xs sm:text-sm leading-relaxed pb-5 border-t border-gray-100 pt-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Help Footnote */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-[#E3ECEC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#053535]">
              Have a custom institutional question?
            </h4>
            <p className="text-xs text-[#527977]">
              Our academic partnership team is available to assist you.
            </p>
          </div>
          <Link href="mailto:info@actonclimate.net">
            <Button
              variant="outline"
              className="border-2 border-[#053535] text-[#053535] hover:bg-[#E6F4F1] rounded-xl text-xs font-semibold gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Partnerships Team</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

