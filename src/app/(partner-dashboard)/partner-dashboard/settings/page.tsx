"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
  Plus,
  X,
  Lock,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";

export interface PartnerProfileFormValues {
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

export default function PartnerSettingsPage() {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState<PartnerProfileFormValues>({
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

  // Helper inputs for tags
  const [tagInputs, setTagInputs] = useState({
    areasOfExpertise: "",
    targetAudience: "",
    educationalOfferings: "",
    typesOfClimateEducation: "",
    instructorNames: "",
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch partner profile on load
  useEffect(() => {
    const fetchPartnerProfile = async () => {
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
        if (res.ok && data?.data?.profile) {
          const p = data.data.profile;
          setFormData({
            organizationName: p.organizationName || "",
            organizationType: p.organizationType || "university",
            website: p.website || "",
            tagline: p.tagline || "",
            bio: p.bio || "",
            areasOfExpertise: p.areasOfExpertise || [],
            targetAudience: p.targetAudience || [],
            educationalOfferings: p.educationalOfferings || [],
            typesOfClimateEducation: p.typesOfClimateEducation || [],
            instructorNames: p.instructorNames || [],
            contactEmail: p.contactEmail || session?.user?.email || "",
            contactPhone: p.contactPhone || "",
          });
        }
      } catch (err) {
        console.error("Error fetching partner profile:", err);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (session) {
      fetchPartnerProfile();
    } else {
      setIsLoadingProfile(false);
    }
  }, [session]);

  // Tag Manager Helpers
  const addTag = (field: keyof PartnerProfileFormValues, value: string) => {
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

  const removeTag = (field: keyof PartnerProfileFormValues, indexToRemove: number) => {
    const currentList = formData[field] as string[];
    setFormData({
      ...formData,
      [field]: currentList.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof PartnerProfileFormValues,
    inputKey: keyof typeof tagInputs
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(field, tagInputs[inputKey]);
      setTagInputs({ ...tagInputs, [inputKey]: "" });
    }
  };

  // Submit Profile Form (PUT /education-partner/me)
  const handleProfileSubmit = async (e: React.FormEvent) => {
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

    try {
      setIsSubmittingProfile(true);
      const token = session?.user?.accessToken;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${backendUrl}/education-partner/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || "Failed to update profile");
      }

      toast.success("Organization Profile updated successfully!");
    } catch (err: any) {
      console.error("Update profile error:", err);
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  // Submit Password Change Form (POST /auth/change-password)
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setIsSubmittingPassword(true);
      const token = session?.user?.accessToken;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${backendUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || "Failed to change password");
      }

      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err: any) {
      console.error("Change password error:", err);
      toast.error(err?.message || "Failed to change password");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#181919]">Partner Settings</h1>
        <p className="text-base text-[#6c6c6c]">
          Dashboard &gt; Settings
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-[#d8dfdf] gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`py-3 px-5 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "profile"
              ? "border-[#004242] text-[#004242]"
              : "border-transparent text-[#6c6c6c] hover:text-[#004242]"
          }`}
        >
          <Building2 className="w-4 h-4" /> Organization Profile
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`py-3 px-5 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "password"
              ? "border-[#004242] text-[#004242]"
              : "border-transparent text-[#6c6c6c] hover:text-[#004242]"
          }`}
        >
          <KeyRound className="w-4 h-4" /> Password & Security
        </button>
      </div>

      {/* TAB 1: Organization Profile Form */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#d8dfdf] space-y-6">
          {isLoadingProfile ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-7 h-7 text-[#004242] animate-spin" />
              <p className="text-xs text-gray-500 font-medium">Loading profile data...</p>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Building2 className="w-5 h-5 text-[#004242]" />
                  <h2 className="text-lg font-bold text-[#181919]">Organization Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Organization Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      placeholder="e.g. Columbia Climate School"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Organization Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.organizationType}
                      onValueChange={(val) => setFormData({ ...formData, organizationType: val })}
                    >
                      <SelectTrigger className="h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl">
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
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
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
                        className="pl-9 h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">Tagline</Label>
                    <Input
                      placeholder="e.g. Developing climate leaders"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Organization Bio / Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Describe your institution's mission, education programs, and goals..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Offerings & Expertise */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <BookOpen className="w-5 h-5 text-[#004242]" />
                  <h2 className="text-lg font-bold text-[#181919]">Offerings & Expertise</h2>
                </div>

                <div className="space-y-4">
                  {/* Areas of Expertise */}
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Areas of Expertise
                    </Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.areasOfExpertise.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1 rounded-full border border-[#BBE3DC]"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeTag("areasOfExpertise", idx)}
                            className="hover:text-red-500 ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {PRESET_EXPERTISE.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => addTag("areasOfExpertise", preset)}
                          className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#004242] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
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
                        className="h-10 text-xs border-[#004242]/10 bg-white rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addTag("areasOfExpertise", tagInputs.areasOfExpertise);
                          setTagInputs({ ...tagInputs, areasOfExpertise: "" });
                        }}
                        className="bg-[#004242] hover:bg-[#003333] text-white h-10 px-4 text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Target Audience
                    </Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.targetAudience.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1 rounded-full border border-[#BBE3DC]"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeTag("targetAudience", idx)}
                            className="hover:text-red-500 ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
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
                          className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#004242] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
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
                        className="h-10 text-xs border-[#004242]/10 bg-white rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addTag("targetAudience", tagInputs.targetAudience);
                          setTagInputs({ ...tagInputs, targetAudience: "" });
                        }}
                        className="bg-[#004242] hover:bg-[#003333] text-white h-10 px-4 text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>
                  </div>

                  {/* Educational Offerings */}
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Educational Offerings
                    </Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.educationalOfferings.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1 rounded-full border border-[#BBE3DC]"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeTag("educationalOfferings", idx)}
                            className="hover:text-red-500 ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
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
                          className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#004242] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
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
                        className="h-10 text-xs border-[#004242]/10 bg-white rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addTag("educationalOfferings", tagInputs.educationalOfferings);
                          setTagInputs({ ...tagInputs, educationalOfferings: "" });
                        }}
                        className="bg-[#004242] hover:bg-[#003333] text-white h-10 px-4 text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>
                  </div>

                  {/* Types of Climate Education */}
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Types of Climate Education
                    </Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.typesOfClimateEducation.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1 rounded-full border border-[#BBE3DC]"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeTag("typesOfClimateEducation", idx)}
                            className="hover:text-red-500 ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
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
                          className="text-[11px] bg-gray-50 hover:bg-[#E6F4F1] hover:text-[#004242] text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 transition-colors"
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
                        className="h-10 text-xs border-[#004242]/10 bg-white rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addTag("typesOfClimateEducation", tagInputs.typesOfClimateEducation);
                          setTagInputs({ ...tagInputs, typesOfClimateEducation: "" });
                        }}
                        className="bg-[#004242] hover:bg-[#003333] text-white h-10 px-4 text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>
                  </div>

                  {/* Key Instructors */}
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
                      Key Instructors / Faculty
                    </Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.instructorNames.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1 rounded-full border border-[#BBE3DC]"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeTag("instructorNames", idx)}
                            className="hover:text-red-500 ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
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
                        className="h-10 text-xs border-[#004242]/10 bg-white rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addTag("instructorNames", tagInputs.instructorNames);
                          setTagInputs({ ...tagInputs, instructorNames: "" });
                        }}
                        className="bg-[#004242] hover:bg-[#003333] text-white h-10 px-4 text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Mail className="w-5 h-5 text-[#004242]" />
                  <h2 className="text-lg font-bold text-[#181919]">Contact Info</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">
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
                        className="pl-9 h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-[#181919] mb-1 block">Contact Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+1-212-854-1754"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="pl-9 h-11 border-[#004242]/10 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmittingProfile}
                  className="bg-[#004242] hover:bg-[#003333] text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-[#004242]/10 text-sm transition-all"
                >
                  {isSubmittingProfile ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                    </span>
                  ) : (
                    "Save Organization Profile"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: Change Password Form */}
      {activeTab === "password" && (
        <div className="w-full bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#d8dfdf] space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#d8dfdf] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold">
                <Lock className="w-6 h-6 text-[#004242]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#181919]">Password & Security</h2>
                <p className="text-sm text-[#6c6c6c]">
                  Manage and update your login password to ensure maximum security for your partner account.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#E6F4F1] text-[#004242] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#BBE3DC] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#004242] animate-pulse"></span>
              Account Security Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Section (7 cols) */}
            <form onSubmit={handlePasswordSubmit} className="lg:col-span-7 space-y-6">
              <div>
                <Label className="text-xs font-semibold text-[#181919] mb-1.5 block">
                  Current Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    required
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="pl-10 pr-10 h-11 border-[#004242]/20 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20 focus-visible:border-[#004242]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004242] transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-[#181919] mb-1.5 block">
                    New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      required
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="pl-10 pr-10 h-11 border-[#004242]/20 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20 focus-visible:border-[#004242]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004242] transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-[#181919] mb-1.5 block">
                    Confirm New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordData.confirmNewPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                      className="pl-10 pr-10 h-11 border-[#004242]/20 bg-white text-sm font-medium text-[#181919] rounded-xl focus-visible:ring-[#004242]/20 focus-visible:border-[#004242]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004242] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-[#6c6c6c]">
                  Password changes take effect immediately on next login.
                </p>
                <Button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="bg-[#004242] hover:bg-[#003333] text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-[#004242]/10 text-sm transition-all flex items-center gap-2"
                >
                  {isSubmittingPassword ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Updating Password...
                    </span>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Password Guidelines Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#F9FAFA] border border-[#d8dfdf] rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#004242] text-white flex items-center justify-center font-bold">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#181919]">Password Guidelines</h3>
                </div>

                <p className="text-xs text-[#6c6c6c] leading-relaxed mb-4">
                  To protect your organization's partner account, please create a strong password that adheres to the following standards:
                </p>

                <ul className="space-y-2.5 text-xs text-[#181919]">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E6F4F1] text-[#004242] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>At least <strong>6 characters</strong> in length</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E6F4F1] text-[#004242] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>Include a mix of <strong>letters, numbers & symbols</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E6F4F1] text-[#004242] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>Avoid using easy-to-guess words or personal info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E6F4F1] text-[#004242] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>Do not share your partner dashboard credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border border-[#d8dfdf] text-[11px] text-[#6c6c6c] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                If you suspect unauthorized access, reset your password immediately or contact support.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
