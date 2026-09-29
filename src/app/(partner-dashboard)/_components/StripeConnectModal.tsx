"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface StripeConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string;
  onSuccess?: () => void;
}

export default function StripeConnectModal({
  isOpen,
  onClose,
  token,
  onSuccess,
}: StripeConnectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  const isDevMode =
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"));

  const handleStartOnboarding = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const currentOrigin =
        typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

      const returnUrl = `${currentOrigin}/partner-dashboard/courses?stripe=success`;
      const refreshUrl = `${currentOrigin}/partner-dashboard/courses?stripe=refresh`;

      const res = await fetch(`${backendUrl}/education-partner/stripe-connect/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          returnUrl,
          refreshUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to generate Stripe onboarding link");
      }

      if (data?.data?.autoVerified) {
        toast.success("Development Mode: Stripe Connect verified! ID & SSN checks skipped.");
        onSuccess?.();
        onClose();
        return;
      }

      if (data?.data?.onboardingUrl) {
        toast.info("Redirecting to Stripe secure verification portal...");
        window.location.href = data.data.onboardingUrl;
      } else {
        throw new Error("No onboarding URL returned from server");
      }
    } catch (err: any) {
      console.error("Stripe onboarding error:", err);
      toast.error(err.message || "Failed to connect to Stripe. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDevSkip = async () => {
    setIsSkipping(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/education-partner/stripe-connect/dev-skip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to skip Stripe verification");
      }

      toast.success("Test Mode: ID & SSN verification skipped! Payouts are now active.");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error("Skip error:", err);
      toast.error(err.message || "Failed to bypass verification");
    } finally {
      setIsSkipping(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[94vw] sm:max-w-lg md:max-w-xl max-w-xl p-0 border border-slate-200 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Banner with Stripe style gradient */}
        <div className="bg-gradient-to-br from-[#004242] via-[#0a5252] to-[#146b6b] p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <CreditCard size={200} />
          </div>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-emerald-200 border border-white/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Required Payout Setup
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Connect Your Stripe Account
            </DialogTitle>
            <DialogDescription className="text-emerald-100/90 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Before you can publish or upload courses, you must connect a Stripe payout
              account to receive direct student tuition deposits.
            </DialogDescription>
          </div>
        </div>

        {/* Benefits list */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3.5">
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
              <div className="w-8 h-8 rounded-xl bg-[#004242] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Direct Bank Deposits
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Student enrollments are deposited directly to your institution&apos;s bank account via Stripe Express.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  0% Platform Commission
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  You keep 100% of your student course tuition revenue with transparent standard payment processing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Fast 2-Minute Setup
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Stripe handles tax reporting, KYC compliance, and payouts securely.
                </p>
              </div>
            </div>
          </div>

          {isDevMode ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">Development / Test Mode Active</p>
                <p className="text-emerald-700 mt-1 leading-relaxed">
                  Government-issued ID and SSN checks are skipped in development mode. You can instantly activate payout capabilities using 1-Click Auto-Verify.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Course creation is disabled until Stripe verification is initiated. You will be redirected to Stripe&apos;s secure portal and returned here once complete.
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading || isSkipping}
              className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-600 font-semibold px-5"
            >
              Cancel
            </Button>

            {isDevMode && (
              <Button
                type="button"
                onClick={handleDevSkip}
                disabled={isLoading || isSkipping}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-5 py-2.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSkipping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Activating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Auto-Verify (Skip ID & SSN)
                  </>
                )}
              </Button>
            )}

            <Button
              type="button"
              onClick={handleStartOnboarding}
              disabled={isLoading || isSkipping}
              className="w-full sm:w-auto bg-[#004242] hover:bg-[#003030] text-white font-bold rounded-xl px-6 py-2.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  Connect with Stripe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
