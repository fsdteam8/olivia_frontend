"use client";

import React, { useState } from "react";
import PartnerSidebar from "./_components/PartnerSidebar";
import PartnerHeader from "./_components/PartnerHeader";

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f6] text-left font-sans">
      {/* Sidebar: Fixed on large screens */}
      <div className="hidden lg:block">
        <PartnerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <PartnerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden lg:pl-72">
        <PartnerHeader onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto container animate-in fade-in slide-in-from-bottom duration-500 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
