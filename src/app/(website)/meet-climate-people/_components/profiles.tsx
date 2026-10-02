"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Leaf,
  Loader2,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Public endpoints do not require an account or session.
const publicApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL,
});
export type ClimateProfile = {
  _id: string;
  name: string;
  professionalTitle?: string;
  organization?: string;
  about?: string;
  location?: string;
  profileImage?: string;
  professionalAreas?: string[];
  climateInterests?: string[];
  lookingFor?: string[];
  canHelpWith?: string[];
  skills?: string[];
  areasOfExpertise?: string[];
  education?: ({ school?: string; degree?: string; year?: string } | string)[];
  experience?: (
    | { title?: string; company?: string; duration?: string }
    | string
  )[];
  linkedin?: string;
  website?: string;
  portfolio?: string;
};
function Portrait({
  profile,
  large = false,
}: {
  profile: ClimateProfile;
  large?: boolean;
}) {
  return (
    <Avatar
      className={`${large ? "h-28 w-28 border-4 border-white shadow-md" : "h-20 w-20"} shrink-0`}
    >
      <AvatarImage
        src={profile.profileImage}
        alt={profile.name}
        className="object-cover"
      />
      <AvatarFallback className="bg-[#e8f1ee] text-2xl font-semibold text-[#004242]">
        {profile.name
          ?.split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "CM"}
      </AvatarFallback>
    </Avatar>
  );
}
function Tags({ items }: { items?: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items?.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-full bg-[#edf5f2] px-3 py-1.5 text-xs font-medium text-[#004242]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
function Loading() {
  return (
    <div
      role="status"
      className="flex justify-center gap-3 py-20 text-[#004242]"
    >
      <Loader2 className="h-5 w-5 animate-spin" />
      Loading profiles…
    </div>
  );
}

export function ProfileDirectory() {
  const [search, setSearch] = useState("");
  const [interest, setInterest] = useState("");
  const [query, setQuery] = useState({ search: "", interest: "", page: 1 });
  const [profiles, setProfiles] = useState<ClimateProfile[]>([]);
  const [meta, setMeta] = useState({ total: 0, totalPage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    publicApi
      .get<{ data: ClimateProfile[]; meta: typeof meta }>(
        "/meet-climate-people",
        {
          signal: controller.signal,
          params: {
            page: query.page,
            limit: 12,
            sortBy: "createdAt",
            sortOrder: "desc",
            ...(query.search && { search: query.search }),
            ...(query.interest && { climateInterest: query.interest }),
          },
        },
      )
      .then(({ data }) => {
        if (!controller.signal.aborted) {
          setProfiles(data.data);
          setMeta(data.meta);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [query, retry]);
  return (
    <div className="bg-[#f7faf8] pb-20 pt-28 sm:pt-36">
      <section className="mx-auto container px-4 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#004242]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#004242]">
            <Leaf className="h-4 w-4" />
            People powering change
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#004242] sm:text-5xl">
            Meet the climate community
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-600">
            Discover the people building a better future. Find shared interests,
            explore their experience, and make your next connection.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setQuery({
              search: search.trim(),
              interest: interest.trim(),
              page: 1,
            });
          }}
          className="mb-8 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto]"
        >
          <div>
            <label
              htmlFor="profile-search"
              className="mb-2 block text-xs font-semibold text-[#004242]"
            >
              Search the community
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="profile-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, title, skills or location"
                className="h-11 pl-9"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="climate-interest"
              className="mb-2 block text-xs font-semibold text-[#004242]"
            >
              Climate interest
            </label>
            <Input
              id="climate-interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              placeholder="e.g. Climate Tech"
              className="h-11"
            />
          </div>
          <Button
            type="submit"
            className="h-11 self-end bg-[#004242] px-6 hover:bg-[#053535]"
          >
            Find people
          </Button>
        </form>
        {(query.search || query.interest) && (
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>
              Filters:{" "}
              {[query.search, query.interest].filter(Boolean).join(" · ")}
            </span>
            <button
              onClick={() => {
                setSearch("");
                setInterest("");
                setQuery({ search: "", interest: "", page: 1 });
              }}
              className="font-semibold text-[#004242] underline"
            >
              Clear filters
            </button>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : error ? (
          <div role="alert" className="rounded-2xl bg-white p-10 text-center">
            <p className="mb-4 text-gray-600">
              We couldn’t load the community. Please try again.
            </p>
            <Button onClick={() => setRetry((value) => value + 1)}>
              Try again
            </Button>
          </div>
        ) : (
          <>
            <p aria-live="polite" className="mb-5 text-sm text-gray-500">
              {meta.total} {meta.total === 1 ? "person" : "people"} in the
              community
            </p>
            {profiles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                <Users className="mx-auto mb-4 h-10 w-10 text-[#004242]/40" />
                <h2 className="text-xl font-semibold text-[#004242]">
                  No profiles found
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Try a different search or climate interest.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {profiles.map((profile) => (
                  <article
                    key={profile._id}
                    className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-[#004242]/5"
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <Portrait profile={profile} />
                      <span className="rounded-full bg-[#fbf4ea] px-3 py-1 text-xs text-[#004242]">
                        Community
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-[#004242]">
                      {profile.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {profile.professionalTitle || "Climate community member"}
                    </p>
                    <div className="my-4 space-y-2 text-xs text-gray-500">
                      {profile.organization && (
                        <p className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 shrink-0" />
                          {profile.organization}
                        </p>
                      )}
                      {profile.location && (
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {profile.location}
                        </p>
                      )}
                    </div>
                    <p className="mb-5 line-clamp-3 whitespace-pre-line text-sm leading-6 text-gray-500">
                      {profile.about}
                    </p>
                    <Tags items={profile.climateInterests?.slice(0, 3)} />
                    {profile.skills?.length ? (
                      <div className="my-5">
                        <p className="mb-2 text-xs font-semibold text-gray-500">
                          Skills
                        </p>
                        <Tags items={profile.skills} />
                      </div>
                    ) : null}
                    <Link
                      href={`/meet-climate-people/${encodeURIComponent(profile._id)}`}
                      aria-label={`View ${profile.name}'s profile`}
                      className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-semibold text-[#004242]"
                    >
                      View profile
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            )}
            {meta.totalPage > 1 && (
              <nav
                aria-label="Profile pagination"
                className="mt-10 flex items-center justify-center gap-5"
              >
                <Button
                  variant="outline"
                  disabled={query.page <= 1}
                  onClick={() =>
                    setQuery((value) => ({ ...value, page: value.page - 1 }))
                  }
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {query.page} of {meta.totalPage}
                </span>
                <Button
                  variant="outline"
                  disabled={query.page >= meta.totalPage}
                  onClick={() =>
                    setQuery((value) => ({ ...value, page: value.page + 1 }))
                  }
                >
                  Next
                </Button>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function safeUrl(value?: string) {
  try {
    const url = new URL(value || "");
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function ProfileDetails({ id }: { id: string }) {
  const [profile, setProfile] = useState<ClimateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    publicApi
      .get<{ data: ClimateProfile }>(
        `/meet-climate-people/${encodeURIComponent(id)}`,
        { signal: controller.signal },
      )
      .then(({ data }) => {
        if (!controller.signal.aborted) setProfile(data.data);
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setError(
            axios.isAxiosError(error) && error.response?.status === 404
              ? "This profile could not be found."
              : "We couldn’t load this profile. Please try again.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id, retry]);
  const box = "rounded-2xl border border-gray-200 bg-white p-6 sm:p-8";
  return (
    <div className="min-h-screen bg-[#f7faf8] pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Link
          href="/meet-climate-people"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#004242]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>
        {loading ? (
          <Loading />
        ) : error ? (
          <div role="alert" className={box}>
            <p className="mb-4 text-gray-600">{error}</p>
            <Button onClick={() => setRetry((value) => value + 1)}>
              Try again
            </Button>
          </div>
        ) : profile ? (
          <>
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="h-28 bg-[#004242] sm:h-36" />
              <div className="px-6 pb-8 sm:px-8">
                <div className="-mt-14 mb-5">
                  <Portrait profile={profile} large />
                </div>
                <h1 className="text-3xl font-semibold text-[#004242] sm:text-4xl">
                  {profile.name}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {profile.professionalTitle}
                </p>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                  {profile.organization && (
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {profile.organization}
                    </span>
                  )}
                  {profile.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <Tags items={profile.professionalAreas} />
                </div>
              </div>
            </section>
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                <section className={box}>
                  <h2 className="mb-4 text-lg font-semibold text-[#004242]">
                    About
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                    {profile.about || "This member hasn’t added a bio yet."}
                  </p>
                </section>
                {(
                  [
                    ["Skills", profile.skills],
                    ["Areas of expertise", profile.areasOfExpertise],
                  ] as const
                ).map(([title, items]) =>
                  items?.length ? (
                    <section key={title} className={box}>
                      <h2 className="mb-4 text-lg font-semibold text-[#004242]">
                        {title}
                      </h2>
                      <Tags items={items} />
                    </section>
                  ) : null,
                )}
                {profile.experience?.length ? (
                  <section className={box}>
                    <h2 className="mb-5 text-lg font-semibold text-[#004242]">
                      Experience
                    </h2>
                    <div className="space-y-5">
                      {profile.experience.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-[#004242]/20 pl-4"
                        >
                          {typeof item === "string" ? (
                            <p className="text-sm text-gray-600">{item}</p>
                          ) : (
                            <>
                              <h3 className="font-semibold text-[#004242]">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {item.company}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {item.duration}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
                {profile.education?.length ? (
                  <section className={box}>
                    <h2 className="mb-5 text-lg font-semibold text-[#004242]">
                      Education
                    </h2>
                    <div className="space-y-5">
                      {profile.education.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-[#004242]/20 pl-4"
                        >
                          {typeof item === "string" ? (
                            <p className="text-sm text-gray-600">{item}</p>
                          ) : (
                            <>
                              <h3 className="font-semibold text-[#004242]">
                                {item.school}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {item.degree}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {item.year}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
              <aside className="space-y-6">
                {(
                  [
                    ["Climate interests", profile.climateInterests],
                    ["Looking for", profile.lookingFor],
                    ["Can help with", profile.canHelpWith],
                  ] as const
                ).map(([title, items]) =>
                  items?.length ? (
                    <section key={title} className={box}>
                      <h2 className="mb-4 text-lg font-semibold text-[#004242]">
                        {title}
                      </h2>
                      <Tags items={items} />
                    </section>
                  ) : null,
                )}
                {[profile.linkedin, profile.website, profile.portfolio].some(
                  safeUrl,
                ) && (
                  <section className={box}>
                    <h2 className="mb-4 text-lg font-semibold text-[#004242]">
                      Connect & explore
                    </h2>
                    <div className="space-y-3">
                      {(
                        [
                          ["LinkedIn", profile.linkedin],
                          ["Website", profile.website],
                          ["Portfolio", profile.portfolio],
                        ] as const
                      ).map(([label, value]) => {
                        const href = safeUrl(value);
                        return href ? (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg bg-[#edf5f2] px-4 py-3 text-sm font-semibold text-[#004242]"
                          >
                            {label}
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </>
        ) : (
          <p className="py-10 text-gray-600">
            This profile could not be found.
          </p>
        )}
      </div>
    </div>
  );
}
