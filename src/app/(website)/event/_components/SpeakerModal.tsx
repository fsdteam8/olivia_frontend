"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface SpeakerModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const SpeakerModal = ({ isOpen, setOpen }: SpeakerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">
        {/* Header Section */}
        <div className="pt-10 pb-6 text-center">
          <DialogTitle className="text-[#004242] text-4xl font-normal tracking-tight">
            Interested in Being a Speaker?
          </DialogTitle>
        </div>

        <form className="px-10 pb-10 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Name
              </Label>
              <Input
                placeholder="Enter your name"
                className="border-slate-200 focus-visible:ring-[#004242] h-11 text-[#729094] placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Email Address
              </Label>
              <Input
                placeholder="Your email address"
                type="email"
                className="border-slate-200 focus-visible:ring-[#004242] h-11 text-[#729094] placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Climate Change Topics Specialization
              </Label>
              <Select>
                <SelectTrigger className="border-slate-200 w-full h-11 text-[#729094]">
                  <SelectValue placeholder="Renewable Energy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="policy">Climate Policy</SelectItem>
                  <SelectItem value="ocean">Ocean Acidification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Industry
              </Label>
              <Select>
                <SelectTrigger className="border-slate-200 w-full h-11 text-[#729094]">
                  <SelectValue placeholder="Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Professional Details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Professional Background
              </Label>
              <Textarea
                placeholder="Briefly describe your professional background and experience."
                className="border-slate-200 focus-visible:ring-[#004242] min-h-[120px] text-[#729094] placeholder:text-slate-300 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Event Interests
              </Label>
              <Select>
                <SelectTrigger className="border-slate-200 h-11 text-[#729094]">
                  <SelectValue placeholder="What type of events are you interested in?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webinar">Webinars</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#729094] font-semibold text-sm">
                Why Climate Matters to You
              </Label>
              <Input
                placeholder="Tell us why working in the climate space is important to you"
                className="border-slate-200 focus-visible:ring-[#004242] h-11 text-[#729094] placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-5 rounded-xl font-bold text-md transition-all active:scale-[0.99]">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpeakerModal;
