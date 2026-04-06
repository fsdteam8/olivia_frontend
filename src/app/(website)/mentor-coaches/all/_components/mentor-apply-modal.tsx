/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// --- TypeScript Interfaces based on your Backend ---
interface SupportItem {
  title: string;
  description: string;
}

interface ExperienceItem {
  title: string;
  description: string;
}

interface MentorJoinFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  bio: string;
  about: string;
  type: "mentor" | "coach";
  skills: string;
  languages: string;
  experienceYears: string;
  linkedin: string;
  website: string;
  isPaidSession: string;
  hourlyRate: string;
  bookingLink: string;
  motivation: string;
  goal: string;
}

export const MentorApplyModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const userId = session?.data?.user?.id;
  const userEmail = session?.data?.user?.email;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Dynamic state for nested arrays
  const [supportList, setSupportList] = useState<SupportItem[]>([
    { title: "", description: "" },
  ]);
  const [expList, setExpList] = useState<ExperienceItem[]>([
    { title: "", description: "" },
  ]);

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<MentorJoinFormInput>({
      defaultValues: {
        email: userEmail || "",
      },
    });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentors-coaches/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to submit");
      return result;
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setOpen(false);
      reset();
      setPreviewUrl(null);
      setSelectedFile(null);
      setSupportList([{ title: "", description: "" }]);
      setExpList([{ title: "", description: "" }]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<MentorJoinFormInput> = (data) => {
    if (!selectedFile) return toast.error("Image is required");
    if (!userId) return toast.error("Please login first");

    const formData = new FormData();

    // 1. Basic Info & File
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("about", data.about);
    formData.append("type", data.type);
    formData.append("experienceYears", data.experienceYears);
    formData.append("bookingLink", data.bookingLink);
    formData.append("motivation", data.motivation || "");
    formData.append("goal", data.goal || "");

    // Optional fields
    formData.append("phone", data.phone || "");
    formData.append("address", data.address || "");
    formData.append("designation", data.designation || "");
    formData.append("linkedin", data.linkedin || "");
    formData.append("website", data.website || "");

    // 2. Convert to Booleans & Numbers
    formData.append(
      "isPaidSession",
      data.isPaidSession === "true" ? "true" : "false",
    );
    formData.append("hourlyRate", data.hourlyRate || "0");

    // 3. Skills & Languages (Multiple append for real Array)
    const skillsArr = data.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    skillsArr.forEach((skill) => formData.append("skills[]", skill));

    const langArr = data.languages
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l !== "");
    langArr.forEach((lang) => formData.append("languages[]", lang));

    // 4. Support & Experience - Send as nested FormData fields
    const validSupport = supportList.filter((s) => s.title.trim() !== "");
    const validExp = expList.filter((e) => e.title.trim() !== "");

    // Send support array as nested fields
    validSupport.forEach((item, index) => {
      formData.append(`support[${index}][title]`, item.title);
      formData.append(`support[${index}][description]`, item.description);
    });

    // Send experience array as nested fields
    validExp.forEach((item, index) => {
      formData.append(`experience[${index}][title]`, item.title);
      formData.append(`experience[${index}][description]`, item.description);
    });

    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto p-8 border-none bg-[#F9FBFA]">
        <DialogHeader>
          <DialogTitle className="text-2xl  text-[#064E4B] text-center">
            Mentors & Coaches Join Form
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg  text-[#064E4B] border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs ">First Name *</Label>
                <Input
                  {...register("firstName", { required: true })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Last Name *</Label>
                <Input
                  {...register("lastName", { required: true })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Email *</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  className="bg-gray-50"
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Phone</Label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+880XXXXXXXXX"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Address</Label>
                <Input
                  {...register("address")}
                  placeholder="Your address"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Designation</Label>
                <Input
                  {...register("designation")}
                  placeholder="e.g., Senior Software Engineer"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <Label className="text-xs ">Headshot Image *</Label>
            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center bg-white relative">
              {previewUrl ? (
                <div className="relative w-24 h-24">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 text-xs text-slate-400 cursor-pointer w-full py-4">
                  <Upload size={20} className="text-[#064E4B]" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg  text-[#064E4B] border-b pb-2">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs ">Expert Focus *</Label>
                <Select onValueChange={(v) => setValue("type", v as any)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Years of Experience *</Label>
                <Input
                  type="number"
                  {...register("experienceYears", { required: true })}
                  placeholder="e.g., 5"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs ">Bio (Short) *</Label>
              <Textarea
                {...register("bio", { required: true })}
                placeholder="Write a short bio about yourself (max 200 characters)"
                rows={3}
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs ">Detailed About *</Label>
              <Textarea
                {...register("about", { required: true })}
                placeholder="Write detailed information about your expertise, experience, and approach"
                rows={5}
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs ">Skills (comma separated) *</Label>
                <Input
                  {...register("skills", { required: true })}
                  placeholder="Agile, React, UI/UX"
                  className="bg-white"
                />
                <p className="text-xs text-gray-500">
                  Separate skills with commas
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Languages (comma separated)</Label>
                <Input
                  {...register("languages")}
                  placeholder="Bangla, English, Hindi"
                  className="bg-white"
                />
                <p className="text-xs text-gray-500">
                  Separate languages with commas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs ">LinkedIn Profile</Label>
                <Input
                  {...register("linkedin")}
                  placeholder="https://linkedin.com/in/username"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Personal Website</Label>
                <Input
                  {...register("website")}
                  placeholder="https://yourwebsite.com"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Support Styles Section */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <Label className="text-sm  block text-[#064E4B]">
              Support Styles
            </Label>
            <p className="text-xs text-gray-500 -mt-2">
              How do you support your clients/mentees?
            </p>
            {supportList.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border">
                  <Input
                    placeholder="Title (e.g., Career Guidance)"
                    value={item.title}
                    onChange={(e) => {
                      const newL = [...supportList];
                      newL[idx].title = e.target.value;
                      setSupportList(newL);
                    }}
                  />
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const newL = [...supportList];
                      newL[idx].description = e.target.value;
                      setSupportList(newL);
                    }}
                  />
                </div>
                {supportList.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setSupportList(supportList.filter((_, i) => i !== idx))
                    }
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setSupportList([...supportList, { title: "", description: "" }])
              }
            >
              <Plus size={16} className="mr-1" /> Add Support Style
            </Button>
          </div>

          {/* Experience Section */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <Label className="text-sm  block text-[#064E4B]">
              Professional Experience
            </Label>
            <p className="text-xs text-gray-500 -mt-2">
              List your relevant work experience
            </p>
            {expList.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border">
                  <Input
                    placeholder="Company/Role (e.g., Senior Developer at Google)"
                    value={item.title}
                    onChange={(e) => {
                      const newL = [...expList];
                      newL[idx].title = e.target.value;
                      setExpList(newL);
                    }}
                  />
                  <Input
                    placeholder="Description (e.g., Led team of 5 developers)"
                    value={item.description}
                    onChange={(e) => {
                      const newL = [...expList];
                      newL[idx].description = e.target.value;
                      setExpList(newL);
                    }}
                  />
                </div>
                {expList.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setExpList(expList.filter((_, i) => i !== idx))
                    }
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setExpList([...expList, { title: "", description: "" }])
              }
            >
              <Plus size={16} className="mr-1" /> Add Experience
            </Button>
          </div>

          {/* Session & Booking Section */}
          <div className="space-y-4">
            <h3 className="text-lg  text-[#064E4B] border-b pb-2">
              Session & Booking Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label className="text-xs ">Paid Session? *</Label>
                <Select onValueChange={(v) => setValue("isPaidSession", v)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No (Free)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Hourly Rate ($)</Label>
                <Input
                  type="number"
                  {...register("hourlyRate")}
                  placeholder="e.g., 50"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs ">Booking Link *</Label>
                <Input
                  {...register("bookingLink", { required: true })}
                  placeholder="https://calendly.com/your-link"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Motivation & Goal Section */}
          <div className="space-y-4">
            <h3 className="text-lg  text-[#064E4B] border-b pb-2">
              Motivation & Goals
            </h3>
            <div className="space-y-1">
              <Label className="text-xs ">Motivation</Label>
              <Textarea
                {...register("motivation")}
                placeholder="Why do you want to become a mentor/coach? What motivates you?"
                rows={3}
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs ">Goal</Label>
              <Textarea
                {...register("goal")}
                placeholder="What are your goals as a mentor/coach? What do you hope to achieve?"
                rows={3}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-center pt-8 border-t">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#064E4B] hover:bg-[#043331] text-white px-20 h-12 rounded-lg  shadow-md transition-all active:scale-95"
            >
              {mutation.isPending ? "Submitting..." : "Apply Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
