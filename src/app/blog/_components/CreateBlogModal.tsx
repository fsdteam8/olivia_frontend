"use client";

import React from "react";
import {
  Upload,
  Bold,
  Italic,
  List,
  Link,
  Quote,
  Image as ImageIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CreateBlogModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">
        {/* Header Section */}
        <div className="p-8 text-center border-b border-slate-50">
          <DialogTitle className="text-[#004242] text-3xl font-normal  mb-2">
            Create a Blog
          </DialogTitle>
          <DialogDescription className="text-[#729094] text-sm font-medium">
            Share your thoughts and insights on climate change and
            sustainability.
          </DialogDescription>
        </div>

        <form className="p-8 space-y-8">
          {/* --- General Information Section --- */}
          <div className="space-y-6 p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-[#004242] font-bold text-xs">
                  Blog Title
                </Label>
                <Input
                  placeholder="hello@example.com"
                  className="rounded-lg border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#004242] font-bold text-xs">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="rounded-lg w-full border-slate-200 text-[#729094]">
                    <SelectValue placeholder="Renewable Energy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="renewable">Renewable Energy</SelectItem>
                    <SelectItem value="policy">Climate Policy</SelectItem>
                    <SelectItem value="tech">Climate Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#004242] font-bold text-xs">
                  Blog Thumbnail Image
                </Label>
                <div className="flex items-center justify-center w-full h-10 border border-dashed border-slate-300 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 text-[#729094] text-xs font-bold">
                    <Upload size={14} />
                    <span>Upload Logo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Description & Details (Rich Text Placeholder) --- */}
          <div className="space-y-4 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-[#004242]  text-sm">Description & Details</h3>
            <div className="space-y-2">
              <Label className="text-slate-400 font-medium text-xs">
                Detailed Description
              </Label>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {/* Toolbar Mockup */}
                <div className="flex items-center gap-4 p-2 bg-slate-50 border-b border-slate-200 text-slate-500">
                  <Bold size={16} className="cursor-pointer" />
                  <Italic size={16} className="cursor-pointer" />
                  <List size={16} className="cursor-pointer" />
                  <Link size={16} className="cursor-pointer" />
                  <Quote size={16} className="cursor-pointer" />
                  <ImageIcon size={16} className="cursor-pointer" />
                </div>
                <Textarea
                  className="border-none focus-visible:ring-0 min-h-[150px] placeholder:text-slate-300 italic"
                  placeholder="Tell candidates about the role and its impact on the climate..."
                />
              </div>
            </div>
          </div>

          {/* --- Author Information --- */}
          <div className="space-y-4 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-[#004242]  text-sm">Author Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-[#004242]  text-xs">Author Name</Label>
                <Input
                  defaultValue="Olivia Krap"
                  className="rounded-lg border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 space-y-2">
                  <Label className="text-slate-400 font-medium text-xs">
                    Description
                  </Label>
                  <Textarea
                    className="rounded-lg border-slate-200 min-h-[100px]"
                    placeholder="Tell candidates about the role and its impact on the climate..."
                  />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <Label className="text-[#004242] font-bold text-xs">
                    Profile Image
                  </Label>
                  <div className="flex flex-col items-center justify-center w-full h-[100px] border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-[#729094]">
                    <Upload size={20} className="mb-2" />
                    <span className="text-[10px] font-bold">Upload</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg font-bold text-md transition-all active:scale-[0.98]">
              Submit Blog
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;
