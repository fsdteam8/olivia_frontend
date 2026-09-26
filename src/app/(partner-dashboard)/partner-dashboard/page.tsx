"use client";

import React, { useEffect, useState } from "react";
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
} from "lucide-react";

export default function PartnerDashboardPage() {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = session?.user?.accessToken;
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const res = await fetch(`${backendUrl}/education-partner/me`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const data = await res.json();
        if (res.ok && data?.data) {
          setProfileData(data.data.profile || null);
        }
      } catch (err) {
        console.error("Failed to fetch partner profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-[#004242] animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading partner portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#181919]">Dashboard Overview</h1>
        <p className="text-base text-[#6c6c6c]">
          Dashboard &gt; Partner Portal
        </p>
      </div>

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
              Manage your institution details, update course offerings, and configure security settings.
            </p>
          </div>

          <Link href="/partner-dashboard/settings">
            <Button className="bg-white text-[#004242] hover:bg-gray-100 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
              <Settings className="w-4 h-4 mr-2" /> Manage Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Account Verification & Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <span className="text-base font-bold text-amber-800">Pending Admin Approval</span>
              </>
            )}
          </div>
          <p className="text-xs text-[#6c6c6c] leading-relaxed">
            {profileData?.isVerifiedPartner
              ? "Your Education Partner profile is verified and active on the platform."
              : "Your account application is currently under admin review."}
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
            0% Commission fee — You keep 100% of revenue from course sales.
          </p>
        </div>

        {/* Quick Action Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#d8dfdf] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider block mb-1">
              Organization Info
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
              Edit Organization Info <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Organization Details Overview */}
      {profileData && (
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#d8dfdf] space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#004242] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#181919]">{profileData.organizationName}</h3>
                {profileData.website && (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#004242] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    {profileData.website} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <Link href="/partner-dashboard/settings">
              <Button variant="outline" size="sm" className="text-xs font-semibold rounded-xl border-[#d8dfdf]">
                <Settings className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
              </Button>
            </Link>
          </div>

          {profileData.bio && (
            <div>
              <h4 className="text-xs font-bold text-[#6c6c6c] uppercase tracking-wider mb-1">
                Bio & Mission
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#f8fafc] p-4 rounded-xl border border-gray-100">
                {profileData.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="space-y-1">
              <span className="font-bold text-[#6c6c6c] uppercase tracking-wider block">Contact Email</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" /> {profileData.contactEmail}
              </span>
            </div>

            {profileData.contactPhone && (
              <div className="space-y-1">
                <span className="font-bold text-[#6c6c6c] uppercase tracking-wider block">Contact Phone</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-gray-400" /> {profileData.contactPhone}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
