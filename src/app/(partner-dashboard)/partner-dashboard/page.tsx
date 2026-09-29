"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
  ShieldAlert,
  Award,
  ExternalLink,
  Loader2,
  ArrowRight,
  BookOpen,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import PartnerCoursesManager from "./courses/_components/PartnerCoursesManager";
import StripeConnectModal from "../_components/StripeConnectModal";
import { fetchStripeStatus, fetchStripeDashboardLink } from "../_lib/stripeConnect";
import { StripeConnectStatus } from "./courses/_components/types";

export default function PartnerDashboardPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [profileData, setProfileData] = useState<any>(null);
  const [stripeStatus, setStripeStatus] = useState<StripeConnectStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isLoadingDashboardLink, setIsLoadingDashboardLink] = useState(false);

  const fetchProfileAndStripe = useCallback(async () => {
    try {
      setIsLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const profilePromise = fetch(`${backendUrl}/education-partner/me`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }).then((r) => r.json());

      const stripePromise = fetchStripeStatus(token);

      const [profileRes, stripeRes] = await Promise.all([
        profilePromise,
        stripePromise,
      ]);

      if (profileRes?.data?.profile) {
        setProfileData(profileRes.data.profile);
      }
      if (stripeRes) {
        setStripeStatus(stripeRes);
      }
    } catch (err) {
      console.error("Failed to fetch partner dashboard info:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (session) {
      fetchProfileAndStripe();
    } else {
      setIsLoading(false);
    }
  }, [session, fetchProfileAndStripe]);

  // Handle return from Stripe onboarding
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const stripeParam = urlParams.get("stripe");
      if (stripeParam === "success" || stripeParam === "return") {
        toast.success("Returned from Stripe onboarding. Refreshing status...");
        fetchProfileAndStripe();
      }
    }
  }, [fetchProfileAndStripe]);

  const isStripeActive = Boolean(
    stripeStatus?.connected &&
      (stripeStatus.status === "active" ||
        stripeStatus.payoutsEnabled ||
        stripeStatus.detailsSubmitted)
  );

  const handleOpenStripeDashboard = async () => {
    try {
      setIsLoadingDashboardLink(true);
      const url = await fetchStripeDashboardLink(token);
      if (url) {
        window.open(url, "_blank");
      } else {
        toast.error("Could not open Stripe Dashboard. Please ensure onboarding is complete.");
      }
    } catch {
      toast.error("Failed to open Stripe Dashboard");
    } finally {
      setIsLoadingDashboardLink(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-[#004242] animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading partner portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Card */}
      <div className="bg-[#004242] text-white rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-left">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-6 pointer-events-none">
          <Building2 size={240} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/20 mb-3">
              <Award className="w-3.5 h-3.5" /> Education Partner Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, {profileData?.organizationName || session?.user?.name || "Partner"}!
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm mt-1 max-w-xl">
              Manage your climate courses, configure tuition payouts, and update institution profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/partner-dashboard/courses">
              <Button className="bg-[#52B788] hover:bg-[#40916c] text-[#004242] hover:text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 border border-white/20">
                <BookOpen className="w-4 h-4 mr-2" /> All Courses
              </Button>
            </Link>
            <Link href="/partner-dashboard/settings">
              <Button className="bg-white text-[#004242] hover:bg-gray-100 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
                <Settings className="w-4 h-4 mr-2" /> Manage Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Account Verification, Membership, Stripe & Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Verification Status Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#d8dfdf] space-y-2">
          <span className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider block">
            Verification Status
          </span>
          <div className="flex items-center gap-2">
            {profileData?.isVerifiedPartner ? (
              <>
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span className="text-base font-bold text-emerald-700">Verified Partner</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-6 h-6 text-amber-600" />
                <span className="text-base font-bold text-amber-800">Pending Review</span>
              </>
            )}
          </div>
          <p className="text-xs text-[#6c6c6c] leading-relaxed">
            {profileData?.isVerifiedPartner
              ? "Your profile is verified and active on the platform."
              : "Account under review by Act on Climate team."}
          </p>
        </div>

        {/* Membership Tier Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#d8dfdf] space-y-2">
          <span className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider block">
            Membership Plan
          </span>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#004242]" />
            <span className="text-base font-bold text-[#181919]">$50.00 / year</span>
          </div>
          <p className="text-xs text-[#6c6c6c] leading-relaxed">
            0% Commission fee — Keep 100% of student tuition.
          </p>
        </div>

        {/* Stripe Payouts Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#d8dfdf] flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider block">
              Stripe Payouts
            </span>
            <div className="flex items-center gap-2">
              {isStripeActive ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span className="text-base font-bold text-emerald-700">Connected</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <span className="text-base font-bold text-amber-800">Setup Required</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#6c6c6c] leading-relaxed">
              {isStripeActive
                ? "Direct tuition bank deposit is active."
                : "Required to publish and sell courses."}
            </p>
          </div>

          <div className="mt-3">
            {isStripeActive ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenStripeDashboard}
                disabled={isLoadingDashboardLink}
                className="text-xs font-bold text-[#004242] hover:text-[#002626] p-0 h-auto hover:bg-transparent inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{isLoadingDashboardLink ? "Opening..." : "View Stripe Dashboard"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setIsStripeModalOpen(true)}
                className="bg-[#004242] hover:bg-[#003030] text-white text-xs font-bold rounded-lg px-3 py-1.5 h-auto w-full cursor-pointer"
              >
                Connect Stripe
              </Button>
            )}
          </div>
        </div>

        {/* Organization Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#d8dfdf] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider block mb-1">
              Organization Profile
            </span>
            <span className="text-sm font-bold text-[#181919] block truncate">
              {profileData?.organizationName || "Profile Information"}
            </span>
            <span className="text-xs text-[#6c6c6c] capitalize block">
              Type: {profileData?.organizationType ? profileData.organizationType.replace("_", " ") : "Not set"}
            </span>
          </div>

          <Link href="/partner-dashboard/settings" className="mt-3">
            <span className="text-xs font-bold text-[#004242] hover:underline inline-flex items-center gap-1">
              Edit Organization <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* CORE COURSE MANAGEMENT TABLE & ACTIONS */}
      <div className="pt-2">
        <PartnerCoursesManager showHeader={true} />
      </div>

      {/* Stripe Connect Modal */}
      <StripeConnectModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        token={token}
      />
    </div>
  );
}
