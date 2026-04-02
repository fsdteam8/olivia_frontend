import React from "react";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: "David Chen",
    role: "Head of Research",
    description:
      "Climate scientist focused on actionable data and community education.",
    image: "/david_chen.png",
  },
  {
    name: "Olivia Karp",
    role: "Founder & CEO",
    description:
      "Passionate about bridging the gap between climate science and public action.",
    image: "/olivia_karp.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Community Manager",
    description:
      "Building bridges between local activists and global initiatives.",
    image: "/elena_rodriguez.png",
  },
];

const MeetOurTeam = () => {
  return (
    <section>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
            Meet Our Team
          </h2>
          <p className="text-[#528B8A] text-lg max-w-2xl mx-auto">
            Down below will have headshot and position of everyone on the Act on
            Climate team.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className={`bg-white p-10 rounded-[32px] shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300`}
            >
              {/* Profile Image */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-[#F1F7F6] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-2xl text-[#064E4B] mb-1">{member.name}</h3>
              <p className="text-[#528B8A] font-semibold text-sm mb-4">
                {member.role}
              </p>
              <p className="text-[#528B8A] text-xs leading-relaxed mb-8 max-w-[220px]">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 bg-[#F1F7F6] rounded-full hover:bg-[#E2EEEB] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#064E4B]" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#F1F7F6] rounded-full hover:bg-[#E2EEEB] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#064E4B]" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#F1F7F6] rounded-full hover:bg-[#E2EEEB] transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#064E4B]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
