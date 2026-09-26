"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle2, Home, LogIn } from "lucide-react";

export default function EducationPartnerSuccessModal() {
  const { data: session } = useSession();

  useEffect(() => {
    // Automatically sign out session if user is logged in
    if (session) {
      signOut({ redirect: false });
    }
  }, [session]);

  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden border border-gray-100">
        {/* Top Decorative Graphic */}
        <div className="w-20 h-20 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#BBE3DC]">
          <CheckCircle2 className="w-10 h-10 text-[#053535]" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#053535] tracking-tight mb-3">
          APPLICATION & PAYMENT SUBMITTED 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B9096] text-sm md:text-base max-w-md mx-auto mb-8">
          Thank you for completing your Education Partner survey and membership payment ($50.00).
        </p>

        {/* Status Highlight Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 text-sm md:text-base mb-1">
                Account Status: Pending Admin Approval
              </h3>
              <p className="text-amber-800 text-xs md:text-sm leading-relaxed">
                Your account is currently awaiting review by an administrator.
                <strong className="block mt-1 text-amber-950 font-semibold">
                  Note: You will NOT be able to log in until an administrator approves your Education Partner account. If you try to log in now, it will return an approval pending error.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link href="/login" className="w-full sm:w-1/2">
            <Button className="w-full h-12 bg-[#053535] hover:bg-[#042a2a] text-white font-bold rounded-xl text-sm shadow-md">
              <LogIn className="w-4 h-4 mr-2" /> Go to Login
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-1/2">
            <Button variant="outline" className="w-full h-12 border-gray-200 text-[#053535] font-bold rounded-xl text-sm hover:bg-gray-50">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
