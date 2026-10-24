"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JoinCommunityModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export default function JoinCommunityModal({
  open,
  onOpenChange,
  trigger,
}: JoinCommunityModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        data-lenis-prevent
        className="sm:max-w-2xl p-6 sm:p-8 bg-white rounded-3xl border border-[#D5E6E4] shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F1] border border-[#BBE3DC] text-[#053535] text-xs font-semibold w-fit mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-[#008080]" />
            <span>Join Act on Climate</span>
          </div>

          <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#053535] hero-font">
            How would you like to join?
          </DialogTitle>

          <DialogDescription className="text-sm text-[#527977]">
            Choose your community path to access personalized tools, resources, and opportunities.
          </DialogDescription>
        </DialogHeader>

        {/* Dual Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          {/* Option 1: General Individual */}
          <div className="rounded-2xl border-2 border-[#E3ECEC] hover:border-[#053535] p-5 sm:p-6 bg-[#FAFCFC] hover:bg-[#F2F8F7] transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#053535]/10 text-[#053535] flex items-center justify-center mb-4 group-hover:bg-[#053535] group-hover:text-white transition-colors duration-200">
                <User className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-semibold text-[#008080] uppercase tracking-wider">
                For Individuals
              </span>

              <h4 className="text-lg font-bold text-[#053535] mt-1 mb-2">
                Climate Jobseeker &amp; Learner
              </h4>

              <p className="text-xs text-[#527977] leading-relaxed mb-4">
                Explore green career jobs, discover courses, attend live events, and connect with mentors in the sustainability sector.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#E3ECEC]">
              <Link
                href="/survey"
                onClick={() => onOpenChange?.(false)}
                className="w-full block"
              >
                <Button className="w-full bg-[#053535] hover:bg-[#084848] text-white text-xs font-semibold py-5 rounded-xl shadow-sm flex items-center justify-center gap-2">
                  <span>Join Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>

              <div className="text-center">
                <Link
                  href="/membership-pricing"
                  onClick={() => onOpenChange?.(false)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#527977] hover:text-[#053535] underline underline-offset-2"
                >
                  <span>Learn more about membership</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Option 2: Educational Partner */}
          <div className="rounded-2xl border-2 border-[#BBE3DC] hover:border-[#008080] p-5 sm:p-6 bg-[#F2F8F7] hover:bg-[#EAF5F3] transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#008080] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-semibold text-[#008080] uppercase tracking-wider">
                For Institutions
              </span>

              <h4 className="text-lg font-bold text-[#053535] mt-1 mb-2">
                Educational Partner
              </h4>

              <p className="text-xs text-[#527977] leading-relaxed mb-4">
                For universities, academies, and bootcamps to feature climate degrees, certificates, and courses directly to students.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#D5E6E4]">
              <Link
                href="/survey/education-partner"
                onClick={() => onOpenChange?.(false)}
                className="w-full block"
              >
                <Button className="w-full bg-[#008080] hover:bg-[#006666] text-white text-xs font-semibold py-5 rounded-xl shadow-sm flex items-center justify-center gap-2">
                  <span>Apply as Partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>

              <div className="text-center">
                <Link
                  href="/educational-partners"
                  onClick={() => onOpenChange?.(false)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#008080] hover:text-[#053535] underline underline-offset-2"
                >
                  <span>Check out Partner Program</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-[#527977]">
            Already have an account?{" "}
            <Link
              href="/login"
              onClick={() => onOpenChange?.(false)}
              className="text-[#053535] font-semibold underline underline-offset-2 hover:text-[#008080]"
            >
              Log in here
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

