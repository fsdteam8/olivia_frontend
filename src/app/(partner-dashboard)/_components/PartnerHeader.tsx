"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Menu, User, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PartnerHeaderProps {
  onMenuToggle: () => void;
}

export default function PartnerHeader({ onMenuToggle }: PartnerHeaderProps) {
  const { data: session } = useSession();

  const user = session?.user;
  const fullName = user?.name || "Education Partner";
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "EP";

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-white px-6 md:px-8 border-b border-gray-200/80 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-[#181919] tracking-tight">
            Partner Portal
          </h1>
          <p className="text-xs text-[#6c6c6c]">
            Dashboard &gt; Education Partner
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Links */}
        <Link href="/partner-dashboard/settings">
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold text-[#004242] border-[#004242]/20 hover:bg-[#004242]/5 h-10 rounded-xl"
          >
            <Settings className="w-4 h-4 mr-1.5 text-[#004242]" />
            <span>Settings</span>
          </Button>
        </Link>

        {/* User Profile - Matching Admin Header */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <span className="text-sm font-bold text-[#181919] tracking-tight hidden sm:inline-block">
            {fullName}
          </span>
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm hover:shadow-md transition-shadow">
            <AvatarImage src={user?.profileImage} alt={fullName} />
            <AvatarFallback className="bg-[#004242]/10 text-[#004242] font-bold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
