"use client";

import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { Building2, ExternalLink, MapPin, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface PartnerOpportunity {
  _id: string;
  title: string;
  organizationName: string;
  opportunityType: string;
  location: string;
  officialLink: string;
  shortDescription: string;
  createdAt: string;
}

interface PartnerOpportunitiesResponse {
  data: PartnerOpportunity[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const opportunityTypes = [
  { label: "All" },
  { label: "Job", value: "Job" },
  { label: "Fellowship", value: "Fellowship" },
  { label: "Internship", value: "Internship" },
  { label: "Resource", value: "Resource" },
  { label: "Courses", value: "courses" },
  { label: "Events", value: "events" },
  { label: "Grants", value: "grants" },
  { label: "Fundraising", value: "fundraising" },
];

const CardSkeleton = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <Skeleton className="h-5 w-24" />
    <Skeleton className="mt-5 h-7 w-3/4" />
    <Skeleton className="mt-4 h-4 w-full" />
    <Skeleton className="mt-2 h-4 w-4/5" />
    <Skeleton className="mt-6 h-11 w-full" />
  </div>
);

export default function PartnerOpportunities() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDeferredValue(searchTerm);
  const [, startTransition] = useTransition();

  const { data, isLoading, isError } = useQuery<PartnerOpportunitiesResponse>({
    queryKey: ["published-opportunities", page, type, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: "6" });
      params.set("partnerOnly", "true");
      if (type !== "All") params.set("opportunityType", type);
      if (search) params.set("search", search);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opportunity/published?${params.toString()}`,
      );
      if (!response.ok) throw new Error("Failed to fetch partner opportunities");
      return response.json();
    },
  });

  useEffect(() => {
    startTransition(() => setPage(1));
  }, [type, search]);

  const opportunities = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section id="partner-opportunities" className="bg-[#f4f9f9] py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl text-[#004d4d] md:text-4xl">Partner Opportunities</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Explore opportunities shared by organisations and reviewed by our team.
          </p>
        </div>

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-full gap-3 overflow-x-auto pb-1">
            {opportunityTypes.map((opportunityType) => (
              <button
                key={opportunityType.label}
                onClick={() => setType(opportunityType.value ?? "All")}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition ${
                  type === (opportunityType.value ?? "All")
                    ? "bg-[#004d4d] text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {opportunityType.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search partner opportunities..."
              className="h-11 rounded-xl border-slate-200 bg-white pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
          ) : isError ? (
            <p className="col-span-full rounded-2xl bg-white py-12 text-center text-rose-600">
              Opportunities could not be loaded right now.
            </p>
          ) : opportunities.length === 0 ? (
            <p className="col-span-full rounded-2xl bg-white py-12 text-center text-slate-500">
              No approved opportunities found.
            </p>
          ) : (
            opportunities.map((opportunity) => (
              <article
                key={opportunity._id}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <Badge className="w-fit bg-[#e6f6f3] text-[#004d4d] hover:bg-[#e6f6f3]">
                  {opportunity.opportunityType}
                </Badge>
                <h3 className="mt-5 text-xl text-[#004d4d]">{opportunity.title}</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 shrink-0" />
                    {opportunity.organizationName}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {opportunity.location}
                  </p>
                </div>
                <p className="mt-4 line-clamp-3 flex-grow text-sm leading-relaxed text-slate-600">
                  {opportunity.shortDescription}
                </p>
                <a
                  href={opportunity.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6"
                >
                  <Button className="w-full bg-[#004d4d] text-white hover:bg-[#003d3d]">
                    View opportunity <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </article>
            ))
          )}
        </div>

        {meta && meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-500">
              Page {meta.page} of {meta.totalPage}
            </span>
            <Button
              variant="outline"
              disabled={page === meta.totalPage}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
