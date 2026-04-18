import React from "react";
import { Users, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: <Users className="w-5 h-5 text-[#0D3B3F]" />,
    title: "Expand Your Network",
    desc: "Connect with climate professionals and expand your network.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[#0D3B3F]" />,
    title: "Build Your Skills",
    desc: "Build skills and grow your impact in the climate sector.",
  },
  {
    icon: <Heart className="w-5 h-5 text-[#0D3B3F]" />,
    title: "Join the Community",
    desc: "Join a supportive community committed to meaningful climate action.",
  },
];

export const Features = () => {
  return (
    <section className=" bg-white">
      <div className="container">
        <h2 className="text-3xl  text-[#004242] text-center mb-16">
          Why Join Our Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-8 border-[#E3ECEC] bg-[#FFFFFF] transition-shadow hover:shadow-[0px_2px_16px_0px_#00424212]"
            >
              {" "}
              <div className="w-10 h-10 bg-[#E8F4F4] text-[#25314C] rounded-full flex items-center justify-center  shadow-sm">
                {f.icon}
              </div>
              <h4 className="text-lg hero-font  text-[#004242] ">{f.title}</h4>
              <p className="text-sm text-[#5D8AA8]  leading-relaxed">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href={"/survey"}>
            <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white px-10 h-12 rounded-md  group">
              Join Community
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
