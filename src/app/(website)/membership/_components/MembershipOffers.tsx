import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, Globe, Lightbulb } from "lucide-react";

const MembershipOffers = () => {
  const offers = [
    {
      title: "Jobs & Opportunities",
      description:
        "Access to climate jobs, resources & opportunities curated in one place",
      icon: <Briefcase className="w-5 h-5 text-[#063b3d]" />,
    },
    {
      title: "Member Events",
      description:
        "Member-only events, workshops & networking with climate professionals",
      icon: <Calendar className="w-5 h-5 text-[#063b3d]" />,
    },
    {
      title: "Global Community",
      description:
        "A supportive global community to connect, collaborate, and grow with",
      icon: <Globe className="w-5 h-5 text-[#063b3d]" />,
    },
    {
      title: "Expert Insights",
      description:
        "Insights, interviews & educational content from climate experts and leaders",
      icon: <Lightbulb className="w-5 h-5 text-[#063b3d]" />,
    },
  ];

  return (
    <section className=" px-6 font-sans">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-[#004242] text-3xl md:text-[40px]  tracking-tight mb-4">
            What our Membership Offers
          </h2>
          <p className="text-[#367588] text-lg font-medium opacity-90">
            Everything you get as a member to grow your climate career
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <Card
              key={index}
              className="border border-[#eef2f3] rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="flex flex-col items-center text-center ">
                {/* Icon Circle */}
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-6">
                  {offer.icon}
                </div>

                {/* Content */}
                <h3 className="text-[#004242] text-xl  leading-tight mb-4">
                  {offer.title}
                </h3>
                <p className="text-[#5D8AA8] text-sm md:text-base leading-relaxed">
                  {offer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipOffers;
