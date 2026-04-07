"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface SpeakerModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

interface Event {
  _id: string;
  title: string;
}

interface SpeakerFormData {
  name: string;
  email: string;
  specialization: string;
  industry: string;
  professionalBackground: string;
  eventId: string;
  climateMatters: string;
}

// Fetch events for the dropdown
const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/published`,
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Failed to fetch events");
  return data.data;
};

// Mutation function to submit speaker application
const applySpeaker = async ({
  formData,
  token,
}: {
  formData: SpeakerFormData;
  token: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/speaker/apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit application");
  }

  return data;
};

const SpeakerModal = ({ isOpen, setOpen }: SpeakerModalProps) => {
  const session = useSession();
  const token = session?.data?.user.accessToken;

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const mutation = useMutation({
    mutationFn: applySpeaker,
    onSuccess: (mess) => {
      toast.success(mess.message || "Application submitted successfully!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to submit: ${error.message}`);
    },
  });

  const [formData, setFormData] = useState<SpeakerFormData>({
    name: "",
    email: "",
    specialization: "",
    industry: "",
    professionalBackground: "",
    eventId: "",
    climateMatters: "",
  });

  const handleChange = (field: keyof SpeakerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to submit an application");
      return;
    }
    mutation.mutate({ formData, token });
  };

  if (isLoading) return <p className="text-center py-20">Loading events...</p>;
  if (isError)
    return (
      <p className="text-center py-20 text-red-500">Failed to load events.</p>
    );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">
        <div className="pt-10 pb-6 text-center">
          <DialogTitle className="text-[#004242] text-4xl font-normal tracking-tight">
            Interested in Being a Speaker?
          </DialogTitle>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Climate Change Topics Specialization</Label>
              <Select
                onValueChange={(value) => handleChange("specialization", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Climate Science" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Climate Science">
                    Climate Science
                  </SelectItem>
                  <SelectItem value="Climate Policy">Climate Policy</SelectItem>
                  <SelectItem value="Climate Justice">
                    Climate Justice
                  </SelectItem>
                  <SelectItem value="Renewable Energy">
                    Renewable Energy
                  </SelectItem>
                  <SelectItem value="Sustainability">Sustainability</SelectItem>
                  <SelectItem value="Climate Tech">Climate Tech</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select
                onValueChange={(value) => handleChange("industry", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Non-profit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Non-profit">Non-profit</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private Sector">Private Sector</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Academia">Academia</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Event</Label>
              <Select onValueChange={(value) => handleChange("eventId", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Professional Details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <Label>Professional Background</Label>
              <Textarea
                placeholder="Briefly describe your professional background and experience."
                value={formData.professionalBackground}
                onChange={(e) =>
                  handleChange("professionalBackground", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Why Climate Matters to You</Label>
              <Input
                placeholder="I am passionate about..."
                value={formData.climateMatters}
                onChange={(e) => handleChange("climateMatters", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#004242] hover:bg-[#003333] text-white py-5 rounded-xl font-bold text-md transition-all active:scale-[0.99]"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpeakerModal;
