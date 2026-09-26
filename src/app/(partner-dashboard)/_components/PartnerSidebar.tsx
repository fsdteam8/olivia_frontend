"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Settings,
  Building2,
  LogOut,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    title: "Dashboard Overview",
    href: "/partner-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Partner Settings",
    href: "/partner-dashboard/settings",
    icon: Settings,
  },
];

export default function PartnerSidebar({ isOpen, onClose }: PartnerSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-[#d8dfdf] shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Section */}
          <div className="p-6 flex flex-col items-center justify-center border-b border-gray-100 relative">
            <Link
              href="/partner-dashboard"
              className="flex flex-col items-center gap-2"
            >
              <Image src="/logo.png" alt="Act on Climate Logo" width={120} height={40} className="h-10 w-auto object-contain" />
              <span className="text-xs font-bold text-[#004242] uppercase tracking-wider bg-[#004242]/5 px-3 py-0.5 rounded-full border border-[#004242]/10 mt-1">
                Partner Portal
              </span>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User / Partner Tag */}
          <div className="mx-4 mt-5 p-3.5 bg-[#fbf4ea] border border-[#004242]/10 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#004242]" />
              <span className="text-xs font-bold text-[#004242] uppercase tracking-wider">
                Education Partner
              </span>
            </div>
            <p className="text-xs text-[#2d2d2d] font-semibold truncate">
              {session?.user?.email || "Partner Account"}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/partner-dashboard"
                  ? pathname === "/partner-dashboard"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#004242] text-white shadow-lg shadow-[#004242]/20"
                      : "text-[#004242] hover:bg-[#004242]/5"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-white" : "text-[#004242]"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-white/80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Quick Action & Logout */}
        <div className="p-6 mt-auto space-y-3 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-600 hover:text-[#004242] hover:bg-[#004242]/5 rounded-lg transition-colors"
          >
            <span>Visit Main Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full justify-center gap-2 border-[1.5px] border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white transition-all duration-300 rounded-xl h-11 font-bold"
          >
            <LogOut className="h-4 w-4 transform rotate-180" />
            Log out
          </Button>
        </div>
      </aside>
    </>
  );
}
