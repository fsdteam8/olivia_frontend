"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ExternalLink, Loader2, Plus, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OpportunityStatus = "pending" | "reviewed" | "rejected";

interface OpportunityFormData {
  title: string;
  opportunityType: string;
  location: string;
  officialLink: string;
  shortDescription: string;
}

interface PartnerOpportunity extends OpportunityFormData {
  _id: string;
  status: OpportunityStatus;
  createdAt: string;
}

const statusStyle: Record<OpportunityStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewed: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
};

const statusLabel: Record<OpportunityStatus, string> = {
  pending: "Pending review",
  reviewed: "Published",
  rejected: "Not approved",
};

export default function PartnerOpportunitiesManager() {
  const { data: session, status: sessionStatus } = useSession();
  const token = session?.user?.accessToken;
  const [opportunities, setOpportunities] = useState<PartnerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<OpportunityFormData>();

  const loadOpportunities = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opportunity/partner/my-submissions`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Could not load opportunities");
      }

      setOpportunities(result?.data ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load opportunities");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      void loadOpportunities();
    }
  }, [loadOpportunities, sessionStatus]);

  const onSubmit = async (data: OpportunityFormData) => {
    if (!token) {
      toast.error("Please sign in to submit an opportunity.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opportunity/partner/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Could not submit the opportunity");
      }

      toast.success("Opportunity submitted for review.");
      reset();
      await loadOpportunities();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit the opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-xl bg-[#004242] p-6 text-white shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/10 p-3"><Send className="h-6 w-6" /></div>
          <div>
            <p className="text-sm font-semibold text-emerald-200">Education Partner benefit</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Share an opportunity</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
              Submit a course, fellowship, event, resource, or job. Our team reviews it before publication and AI recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-[#d8dfdf] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#004242]" />
            <h2 className="text-xl font-bold text-[#181919]">Submit for review</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Opportunity title</Label>
              <Input id="title" {...register("title", { required: "Title is required" })} placeholder="e.g. Climate Leadership Fellowship" />
              {errors.title && <p className="text-xs text-rose-600">{errors.title.message}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="opportunityType">Type</Label>
                <select id="opportunityType" {...register("opportunityType", { required: "Choose a type" })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select type</option>
                  <option value="Job">Job</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Internship">Internship</option>
                  <option value="Resource">Resource</option>
                  <option value="courses">Course</option>
                  <option value="events">Event</option>
                  <option value="grants">Grant</option>
                  <option value="fundraising">Fundraising</option>
                </select>
                {errors.opportunityType && <p className="text-xs text-rose-600">{errors.opportunityType.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location", { required: "Location is required" })} placeholder="Remote or city, country" />
                {errors.location && <p className="text-xs text-rose-600">{errors.location.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="officialLink">Official link</Label>
              <Input id="officialLink" type="url" {...register("officialLink", { required: "Official link is required" })} placeholder="https://..." />
              {errors.officialLink && <p className="text-xs text-rose-600">{errors.officialLink.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short description</Label>
              <textarea id="shortDescription" rows={4} maxLength={300} {...register("shortDescription", { required: "Description is required", maxLength: 300 })} placeholder="Briefly describe this opportunity..." className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              {errors.shortDescription && <p className="text-xs text-rose-600">{errors.shortDescription.message}</p>}
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-[#004242] hover:bg-[#003535]">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit opportunity"}
            </Button>
          </form>
        </section>

        <section className="rounded-xl border border-[#d8dfdf] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#181919]">My submitted opportunities</h2>
          <p className="mt-1 text-sm text-slate-500">Only published opportunities are visible publicly and available for AI recommendations.</p>
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-[#004242]" /></div>
            ) : opportunities.length === 0 ? (
              <p className="rounded-lg bg-[#f4f7f6] p-5 text-sm text-slate-500">You have not submitted an opportunity yet.</p>
            ) : opportunities.map((opportunity) => (
              <article key={opportunity._id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#181919]">{opportunity.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{opportunity.opportunityType} · {opportunity.location}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[opportunity.status]}`}>{statusLabel[opportunity.status]}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{opportunity.shortDescription}</p>
                <a href={opportunity.officialLink} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#004242] hover:underline">
                  View official link <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
