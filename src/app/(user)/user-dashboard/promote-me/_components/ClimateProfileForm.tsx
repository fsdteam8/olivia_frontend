"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import SkillsInput from "./SkillsInput";

const url = z
  .string()
  .trim()
  .refine((value) => {
    if (!value) return true;
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  }, "Enter a valid http or https URL");
const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  professionalTitle: z.string().trim().min(1, "Professional title is required"),
  organization: z.string().trim(),
  about: z.string().trim(),
  location: z.string().trim(),
  professionalAreas: z.string(),
  climateInterests: z.string(),
  lookingFor: z.string(),
  canHelpWith: z.string(),
  skills: z.string(),
  areasOfExpertise: z.string(),
  education: z.array(
    z.object({
      school: z.string().trim().min(1, "School is required"),
      degree: z.string().trim().min(1, "Degree is required"),
      year: z.string().trim(),
    }),
  ),
  experience: z.array(
    z.object({
      title: z.string().trim().min(1, "Title is required"),
      company: z.string().trim().min(1, "Company is required"),
      duration: z.string().trim(),
    }),
  ),
  linkedin: url,
  website: url,
  portfolio: url,
  profileImage: url,
  isVisible: z.boolean(),
});
type Values = z.infer<typeof schema>;
const listFields = [
  "professionalAreas",
  "climateInterests",
  "lookingFor",
  "canHelpWith",
  "skills",
  "areasOfExpertise",
] as const;
type Profile = Omit<
  Values,
  (typeof listFields)[number] | "education" | "experience"
> & {
  _id?: string;
  professionalAreas: string[];
  climateInterests: string[];
  lookingFor: string[];
  canHelpWith: string[];
  skills: string[];
  areasOfExpertise: string[];
  education: (Values["education"][number] | string)[];
  experience: (Values["experience"][number] | string)[];
};
const defaults: Values = {
  name: "",
  professionalTitle: "",
  organization: "",
  about: "",
  location: "",
  professionalAreas: "",
  climateInterests: "",
  lookingFor: "",
  canHelpWith: "",
  skills: "",
  areasOfExpertise: "",
  education: [],
  experience: [],
  linkedin: "",
  website: "",
  portfolio: "",
  profileImage: "",
  isVisible: false,
};
function toValues(profile: Profile): Values {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.keys(defaults).map((key) => [
        key,
        profile[key as keyof Profile] ?? defaults[key as keyof Values],
      ]),
    ),
    ...Object.fromEntries(
      listFields.map((key) => [key, (profile[key] || []).join(", ")]),
    ),
    education: (profile.education || []).map((item) =>
      typeof item === "string"
        ? { school: item, degree: "", year: "" }
        : {
            school: item.school || "",
            degree: item.degree || "",
            year: item.year || "",
          },
    ),
    experience: (profile.experience || []).map((item) =>
      typeof item === "string"
        ? { title: item, company: "", duration: "" }
        : {
            title: item.title || "",
            company: item.company || "",
            duration: item.duration || "",
          },
    ),
  };
}
function errorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? error.response?.data?.message ||
        "Unable to save your profile. Please try again."
    : "Something went wrong. Please try again.";
}

export default function ClimateProfileForm() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [membershipRequired, setMembershipRequired] = useState(false);
  const [exists, setExists] = useState(false);
  const saving = useRef(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });
  const education = useFieldArray({ control, name: "education" });
  const experience = useFieldArray({ control, name: "experience" });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError("");
    api
      .get<{ data: Profile | null }>("/meet-climate-people/me", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        setExists(Boolean(data.data));
        reset(data.data ? toValues(data.data) : defaults);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setLoadError(errorMessage(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reset, retry]);

  const submit = async (values: Values) => {
    if (saving.current) return;
    saving.current = true;
    setSaveError("");
    setMembershipRequired(false);
    const payload = {
      ...values,
      ...Object.fromEntries(
        listFields.map((key) => [
          key,
          [
            ...new Set(
              values[key]
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            ),
          ],
        ]),
      ),
    };
    try {
      const { data } = await api.request<{ data: Profile }>({
        url: "/meet-climate-people/me",
        method: exists ? "PUT" : "POST",
        data: payload,
      });
      setExists(true);
      reset(data.data ? toValues(data.data) : values);
      toast.success(
        exists
          ? "Profile updated successfully"
          : "Profile created successfully",
      );
    } catch (error) {
      setSaveError(errorMessage(error));
      setMembershipRequired(
        axios.isAxiosError(error) && error.response?.status === 403,
      );
    } finally {
      saving.current = false;
    }
  };
  const field = (
    key: keyof Pick<
      Values,
      | "name"
      | "professionalTitle"
      | "organization"
      | "location"
      | "linkedin"
      | "website"
      | "portfolio"
      | "profileImage"
      | (typeof listFields)[number]
    >,
    label: string,
    placeholder?: string,
  ) => (
    <div key={key} className="space-y-2">
      <label htmlFor={key} className="text-sm font-medium text-[#004242]">
        {label}
        {["name", "professionalTitle"].includes(key) && " *"}
      </label>
      <Input
        id={key}
        {...register(key)}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className="h-11 bg-white"
      />
      {errors[key] && (
        <p id={`${key}-error`} className="text-xs text-red-600">
          {errors[key]?.message}
        </p>
      )}
    </div>
  );
  const sectionClass =
    "space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7";
  if (loading)
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl bg-white p-8 text-gray-500"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading your profile…
      </div>
    );
  if (loadError)
    return (
      <div role="alert" className={sectionClass}>
        <p className="text-red-600">{loadError}</p>
        <Button onClick={() => setRetry((value) => value + 1)}>
          Try again
        </Button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="rounded-xl border border-[#004242]/10 bg-[#004242]/5 p-4 text-sm leading-6 text-[#004242]">
        {exists
          ? "Your account already has a profile. Changes will update this same profile."
          : "Create your profile once. You can return here to update it anytime."}{" "}
        A paid membership is required to save your profile.{" "}
        <Link href="/membership-pricing" className="font-semibold underline">
          View plans
        </Link>
      </div>
      <fieldset
        disabled={isSubmitting}
        className="space-y-6 disabled:opacity-70"
      >
        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#004242]">About you</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name")}
            {field("professionalTitle", "Professional title")}
            {field("organization", "Organization")}
            {field("location", "Location", "City, Country")}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="about"
              className="text-sm font-medium text-[#004242]"
            >
              About
            </label>
            <Textarea
              id="about"
              {...register("about")}
              rows={5}
              placeholder="Share your background and your work in climate."
            />
          </div>
        </section>
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-semibold text-[#004242]">
              Interests & skills
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Separate each item with a comma.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {field(
              "professionalAreas",
              "Professional areas",
              "Professional, Entrepreneur",
            )}
            {field(
              "climateInterests",
              "Climate interests",
              "Climate Tech, Energy",
            )}
            {field("lookingFor", "Looking for", "Mentorship, Jobs, Networking")}
            {field("canHelpWith", "I can help with", "Engineering, Marketing")}
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <SkillsInput value={field.value} onChange={field.onChange} />
              )}
            />
            {field(
              "areasOfExpertise",
              "Areas of expertise",
              "Clean Energy Solutions, Decarbonization",
            )}
          </div>
        </section>
        <section className={sectionClass}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#004242]">Education</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                education.append({ school: "", degree: "", year: "" })
              }
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {education.fields.length === 0 && (
            <p className="text-sm text-gray-500">
              Add your education (optional).
            </p>
          )}
          {education.fields.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Education {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove education ${index + 1}`}
                  onClick={() => education.remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {(["school", "degree", "year"] as const).map((key) => (
                  <div key={key} className="space-y-2">
                    <label
                      htmlFor={`education-${index}-${key}`}
                      className="text-sm capitalize"
                    >
                      {key}
                    </label>
                    <Input
                      id={`education-${index}-${key}`}
                      {...register(`education.${index}.${key}`)}
                      aria-invalid={Boolean(errors.education?.[index]?.[key])}
                    />
                    {errors.education?.[index]?.[key] && (
                      <p className="text-xs text-red-600">
                        {errors.education[index]?.[key]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section className={sectionClass}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#004242]">Experience</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                experience.append({ title: "", company: "", duration: "" })
              }
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {experience.fields.length === 0 && (
            <p className="text-sm text-gray-500">
              Add your work experience (optional).
            </p>
          )}
          {experience.fields.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Experience {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove experience ${index + 1}`}
                  onClick={() => experience.remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {(["title", "company", "duration"] as const).map((key) => (
                  <div key={key} className="space-y-2">
                    <label
                      htmlFor={`experience-${index}-${key}`}
                      className="text-sm capitalize"
                    >
                      {key}
                    </label>
                    <Input
                      id={`experience-${index}-${key}`}
                      {...register(`experience.${index}.${key}`)}
                      placeholder={
                        key === "duration" ? "2022 - Present" : undefined
                      }
                      aria-invalid={Boolean(errors.experience?.[index]?.[key])}
                    />
                    {errors.experience?.[index]?.[key] && (
                      <p className="text-xs text-red-600">
                        {errors.experience[index]?.[key]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#004242]">
            Links & visibility
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("linkedin", "LinkedIn URL")}
            {field("website", "Website URL")}
            {field("portfolio", "Portfolio URL")}
            {field("profileImage", "Profile image URL")}
          </div>
          <label className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
            <input
              type="checkbox"
              {...register("isVisible")}
              className="mt-1 h-4 w-4 accent-[#004242]"
            />
            <span>
              <span className="text-sm font-medium text-[#004242]">
                Show my profile on the website
              </span>
              <span className="mt-1 block text-xs leading-5 text-gray-500">
                Turn this off to keep your profile hidden from public listings.
              </span>
            </span>
          </label>
        </section>
      </fieldset>
      {saveError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {saveError}
          {membershipRequired && (
            <Link
              href="/membership-pricing"
              className="mt-2 block font-semibold underline"
            >
              Choose a membership plan
            </Link>
          )}
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || (exists && !isDirty)}
          className="h-12 rounded-xl bg-[#004242] px-7 hover:bg-[#053535]"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting
            ? "Saving…"
            : exists
              ? "Update profile"
              : "Create profile"}
        </Button>
      </div>
    </form>
  );
}
