"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Sparkles,
  Plus,
  X,
  CreditCard,
  Lock,
  Loader2,
  AlertCircle,
  Award,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface EducationPartnerSurveyData {
  organizationName: string;
  organizationType: string;
  website: string;
  tagline: string;
  bio: string;
  areasOfExpertise: string[];
  targetAudience: string[];
  educationalOfferings: string[];
  typesOfClimateEducation: string[];
  instructorNames: string[];
  contactEmail: string;
  contactPhone: string;
}

const SAMPLE_DATA: EducationPartnerSurveyData = {
  organizationName: "Columbia Climate School",
  organizationType: "university",
  website: "https://climate.columbia.edu",
  tagline: "Developing the next generation of climate leaders",
  bio: "The Columbia Climate School provides transdisciplinary education and research to tackle climate change and advance sustainability solutions worldwide.",
  areasOfExpertise: ["Climate Science", "Climate Policy", "Climate Finance", "ESG"],
  targetAudience: ["Graduate Students", "Mid-career Professionals", "Policymakers"],
  educationalOfferings: ["Master of Science", "Executive Certificates", "Short Workshops"],
  typesOfClimateEducation: ["Climate Finance", "Renewable Energy Transition", "Carbon Accounting"],
  instructorNames: ["Dr. Jason Bordoff", "Dr. Maureen Raymo"],
  contactEmail: "education@climate.columbia.edu",
  contactPhone: "+1-212-854-1754",
};

const PRESET_EXPERTISE = [
  "Climate Science",
  "Climate Policy",
  "Climate Finance",
  "ESG",
  "Renewable Energy",
  "Sustainability",
  "Carbon Accounting",
  "Climate Risk",
];

const PRESET_AUDIENCE = [
  "Graduate Students",
  "Mid-career Professionals",
  "Policymakers",
  "Executives",
  "Undergraduates",
];

const PRESET_OFFERINGS = [
  "Master of Science",
  "Executive Certificates",
  "Short Workshops",
  "Online Courses",
  "Bootcamps",
];

const PRESET_CLIMATE_TYPES = [
  "Climate Finance",
  "Renewable Energy Transition",
  "Carbon Accounting",
  "Climate Governance",
  "Clean Tech",
];

export default function EducationPartnerSurvey() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<EducationPartnerSurveyData>({
    organizationName: "",
    organizationType: "university",
    website: "",
    tagline: "",
    bio: "",
    areasOfExpertise: [],
    targetAudience: [],
    educationalOfferings: [],
    typesOfClimateEducation: [],
    instructorNames: [],
    contactEmail: session?.user?.email || "",
    contactPhone: "",
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tagInputs, setTagInputs] = useState({
    areasOfExpertise: "",
    targetAudience: "",
    educationalOfferings: "",
    typesOfClimateEducation: "",
    instructorNames: "",
  });

  const handleFillSample = () => {
    setFormData(SAMPLE_DATA);
    toast.success("Sample Columbia Climate School data loaded!");
  };

  const addTag = (field: keyof EducationPartnerSurveyData, value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const currentList = formData[field] as string[];
    if (!currentList.includes(trimmed)) {
      setFormData({
        ...formData,
        [field]: [...currentList, trimmed],
      });
    }
  };

  const removeTag = (field: keyof EducationPartnerSurveyData, indexToRemove: number) => {
    const currentList = formData[field] as string[];
    setFormData({
      ...formData,
      [field]: currentList.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof EducationPartnerSurveyData,
    inputKey: keyof typeof tagInputs
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(field, tagInputs[inputKey]);
      setTagInputs({ ...tagInputs, [inputKey]: "" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizationName.trim()) {
      toast.error("Organization Name is required");
      return;
    }
    if (!formData.website.trim()) {
      toast.error("Website URL is required");
      return;
    }
    if (!formData.bio.trim()) {
      toast.error("Organization Bio is required");
      return;
    }
    if (!formData.contactEmail.trim()) {
      toast.error("Contact Email is required");
      return;
    }

    setShowPaymentModal(true);
  };

  const handleProcessPaymentAndSubmit = async () => {
    try {
      setIsSubmitting(true);
      const token = session?.user?.accessToken;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      // 1. Submit Survey to Backend
      const surveyRes = await fetch(`${backendUrl}/education-partner/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const surveyResult = await surveyRes.json();
      if (!surveyRes.ok) {
        throw new Error(surveyResult?.message || "Failed to submit survey");
      }

      // 2. Request Stripe Checkout Session from Backend
      const checkoutRes = await fetch(
        `${backendUrl}/education-partner/membership/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            successUrl: `${window.location.origin}/survey/education-partner/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/survey/education-partner`,
          }),
        }
      );

      const checkoutResult = await checkoutRes.json();
      if (!checkoutRes.ok) {
        throw new Error(
          checkoutResult?.message || "Failed to create payment checkout session"
        );
      }

      const checkoutUrl =
        checkoutResult?.data?.checkoutUrl || checkoutResult?.checkoutUrl;

      if (checkoutUrl) {
        toast.success("Redirecting to Stripe checkout...");
        // Navigate directly to Stripe checkout URL
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No Stripe checkout URL returned from server.");
      }
    } catch (err: any) {
      console.error("Payment checkout error:", err);
      toast.error(err?.message || "Failed to initiate payment checkout");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-2 sm:px-4">
      {/* Top Header Card - Centered & Sleek */}
      <div className="bg-gradient-to-br from-[#032525] via-[#053535] to-[#0a4848] text-white rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl border border-teal-500/20 text-center relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <GraduationCap size={240} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#008080]/30 text-[#6CE5C2] border border-[#008080]/40 backdrop-blur-md mb-3">
            <Award className="w-3.5 h-3.5" /> Education Partner Onboarding
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
            Education Partner Survey
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed mb-4">
            Showcase your climate education programs, workshops, and degrees to learners across our network. Please fill out your organization profile below.
          </p>

          <Button
            type="button"
            onClick={handleFillSample}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-medium rounded-full py-1.5 px-4 backdrop-blur-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
            Auto-fill Sample Data (Columbia Climate School)
          </Button>
        </div>
      </div>

      {/* Main Survey Form Card */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100/80 space-y-6 text-left"
      >
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Building2 className="w-5 h-5 text-[#008080]" />
            <h2 className="text-lg font-bold text-[#053535]">Organization Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Organization Name <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                placeholder="e.g. Columbia Climate School"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="h-10 text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Organization Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.organizationType}
                onValueChange={(val) => setFormData({ ...formData, organizationType: val })}
              >
                <SelectTrigger className="h-10 text-sm border-gray-200 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit / NGO</SelectItem>
                  <SelectItem value="professional_education">Professional Education</SelectItem>
                  <SelectItem value="training_organization">Training Organization</SelectItem>
                  <SelectItem value="industry_association">Industry Association</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="independent_educator">Independent Educator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Website URL <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  required
                  type="url"
                  placeholder="https://climate.columbia.edu"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="pl-9 h-10 text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">Tagline</Label>
              <Input
                placeholder="e.g. Developing climate leaders"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="h-10 text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Organization Bio / Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={3}
                placeholder="Describe your institution's mission, education programs, and goals..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Offerings & Expertise */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <BookOpen className="w-5 h-5 text-[#008080]" />
            <h2 className="text-lg font-bold text-[#053535]">Offerings & Expertise</h2>
          </div>

          <div className="space-y-4">
            {/* Areas of Expertise */}
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Areas of Expertise
              </Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.areasOfExpertise.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag("areasOfExpertise", idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1 mb-2">
                {PRESET_EXPERTISE.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addTag("areasOfExpertise", preset)}
                    className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#053535] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom expertise & press Enter"
                  value={tagInputs.areasOfExpertise}
                  onChange={(e) => setTagInputs({ ...tagInputs, areasOfExpertise: e.target.value })}
                  onKeyDown={(e) => handleTagKeyDown(e, "areasOfExpertise", "areasOfExpertise")}
                  className="h-9 text-xs border-gray-200 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTag("areasOfExpertise", tagInputs.areasOfExpertise);
                    setTagInputs({ ...tagInputs, areasOfExpertise: "" });
                  }}
                  className="bg-[#053535] hover:bg-[#042a2a] text-white h-9 px-3 text-xs rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Target Audience
              </Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.targetAudience.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag("targetAudience", idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {PRESET_AUDIENCE.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addTag("targetAudience", preset)}
                    className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#053535] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Graduate Students, Policymakers"
                  value={tagInputs.targetAudience}
                  onChange={(e) => setTagInputs({ ...tagInputs, targetAudience: e.target.value })}
                  onKeyDown={(e) => handleTagKeyDown(e, "targetAudience", "targetAudience")}
                  className="h-9 text-xs border-gray-200 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTag("targetAudience", tagInputs.targetAudience);
                    setTagInputs({ ...tagInputs, targetAudience: "" });
                  }}
                  className="bg-[#053535] hover:bg-[#042a2a] text-white h-9 px-3 text-xs rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>

            {/* Educational Offerings */}
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Educational Offerings
              </Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.educationalOfferings.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag("educationalOfferings", idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {PRESET_OFFERINGS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addTag("educationalOfferings", preset)}
                    className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#053535] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Master of Science, Certificates"
                  value={tagInputs.educationalOfferings}
                  onChange={(e) => setTagInputs({ ...tagInputs, educationalOfferings: e.target.value })}
                  onKeyDown={(e) => handleTagKeyDown(e, "educationalOfferings", "educationalOfferings")}
                  className="h-9 text-xs border-gray-200 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTag("educationalOfferings", tagInputs.educationalOfferings);
                    setTagInputs({ ...tagInputs, educationalOfferings: "" });
                  }}
                  className="bg-[#053535] hover:bg-[#042a2a] text-white h-9 px-3 text-xs rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>

            {/* Types of Climate Education */}
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Types of Climate Education
              </Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.typesOfClimateEducation.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag("typesOfClimateEducation", idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {PRESET_CLIMATE_TYPES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addTag("typesOfClimateEducation", preset)}
                    className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#053535] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Carbon Accounting, Clean Energy"
                  value={tagInputs.typesOfClimateEducation}
                  onChange={(e) =>
                    setTagInputs({ ...tagInputs, typesOfClimateEducation: e.target.value })
                  }
                  onKeyDown={(e) =>
                    handleTagKeyDown(e, "typesOfClimateEducation", "typesOfClimateEducation")
                  }
                  className="h-9 text-xs border-gray-200 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTag("typesOfClimateEducation", tagInputs.typesOfClimateEducation);
                    setTagInputs({ ...tagInputs, typesOfClimateEducation: "" });
                  }}
                  className="bg-[#053535] hover:bg-[#042a2a] text-white h-9 px-3 text-xs rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>

            {/* Key Instructors */}
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Key Instructors / Faculty
              </Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.instructorNames.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag("instructorNames", idx)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Dr. Jason Bordoff, Dr. Maureen Raymo"
                  value={tagInputs.instructorNames}
                  onChange={(e) => setTagInputs({ ...tagInputs, instructorNames: e.target.value })}
                  onKeyDown={(e) => handleTagKeyDown(e, "instructorNames", "instructorNames")}
                  className="h-9 text-xs border-gray-200 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTag("instructorNames", tagInputs.instructorNames);
                    setTagInputs({ ...tagInputs, instructorNames: "" });
                  }}
                  className="bg-[#053535] hover:bg-[#042a2a] text-white h-9 px-3 text-xs rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Mail className="w-5 h-5 text-[#008080]" />
            <h2 className="text-lg font-bold text-[#053535]">Contact Info</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">
                Contact Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  required
                  type="email"
                  placeholder="education@climate.columbia.edu"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="pl-9 h-10 text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#053535] mb-1 block">Contact Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+1-212-854-1754"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="pl-9 h-10 text-sm border-gray-200 focus-visible:ring-[#053535] rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Centered Submit Action */}
        <div className="pt-4 flex flex-col items-center justify-center text-center space-y-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Next step: Membership confirmation & Stripe payment checkout ($50/yr).
          </p>
          <Button
            type="submit"
            className="w-full sm:w-auto h-11 px-10 bg-gradient-to-r from-[#053535] to-[#008080] hover:from-[#032525] hover:to-[#006666] text-white rounded-xl font-bold text-sm shadow-xl transition-all active:scale-95"
          >
            Continue to Payment ($50/year)
          </Button>
        </div>
      </form>

      {/* Confirmation Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 relative animate-in fade-in zoom-in-95 duration-200 text-left">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#053535] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1 border border-[#BBE3DC]">
                  <CreditCard className="w-3 h-3" /> Membership Confirmation
                </span>
                <h3 className="text-xl font-bold text-[#053535]">Confirm Payment</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fee Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">Program Plan:</span>
                <span className="font-bold text-[#053535]">Education Partner Membership</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">Course Sales Commission:</span>
                <span className="font-bold text-emerald-600">0% Commission (100% Yours)</span>
              </div>
              <div className="flex justify-between items-center text-base border-t border-gray-200 pt-2 mt-1">
                <span className="font-bold text-[#053535]">Annual Fee:</span>
                <span className="font-extrabold text-xl text-[#053535]">$50.00 / year</span>
              </div>
            </div>

            {/* Info Message */}
            <p className="text-xs text-gray-600 leading-relaxed">
              Clicking proceed will save your Education Partner survey details and open Stripe secure checkout to complete your payment.
            </p>

            {/* Admin Approval Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5 text-amber-900 text-xs leading-snug">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Admin Approval Required</strong>
                After payment, your Education Partner account will require <strong>Admin Approval</strong> before login is permitted.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handleProcessPaymentAndSubmit}
                className="h-11 bg-gradient-to-r from-[#053535] to-[#008080] hover:from-[#032525] hover:to-[#006666] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md w-full transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Proceed to Stripe Payment ($50/year) <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowPaymentModal(false)}
                variant="ghost"
                className="text-gray-500 text-xs hover:text-gray-700 h-8"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
