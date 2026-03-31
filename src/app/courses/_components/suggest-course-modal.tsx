"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuggestCourseModal = ({ open, onOpenChange }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-3xl font-bold text-[#004242]">
            Suggest a Course Idea
          </DialogTitle>
          <DialogDescription className="text-gray-500 lg:max-w-lg mx-auto">
            Help us build new climate courses for our community. Share your
            expertise or request a topic you&apos;re passionate about.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-4">
          {/* Course Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title Idea</Label>
            <Input id="title" placeholder="hello@example.com" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label>Course Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Renewable Energy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="policy">Climate Policy</SelectItem>
                  <SelectItem value="agri">Sustainable Agriculture</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skill Level */}
            <div className="space-y-2">
              <Label>Skill Level</Label>
              <RadioGroup
                defaultValue="beginner"
                className="flex border rounded-md p-1"
              >
                <div className="flex-1">
                  <RadioGroupItem
                    value="beginner"
                    id="beginner"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="beginner"
                    className="flex items-center justify-center py-2 text-sm rounded-sm cursor-pointer peer-data-[state=checked]:bg-gray-100 peer-data-[state=checked]:text-[#004242] font-medium"
                  >
                    Beginner
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value="intermediate"
                    id="intermediate"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="intermediate"
                    className="flex items-center justify-center py-2 text-sm rounded-sm cursor-pointer peer-data-[state=checked]:bg-gray-100 peer-data-[state=checked]:text-[#004242] font-medium border-x"
                  >
                    Intermediate
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value="advanced"
                    id="advanced"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="advanced"
                    className="flex items-center justify-center py-2 text-sm rounded-sm cursor-pointer peer-data-[state=checked]:bg-gray-100 peer-data-[state=checked]:text-[#004242] font-medium"
                  >
                    Advanced
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              placeholder="Tell candidates about the role and its impact on the climate..."
              className="min-h-[100px]"
            />
          </div>

          {/* Key Topics */}
          <div className="space-y-2">
            <Label htmlFor="topics">Key Topics</Label>
            <Input id="topics" placeholder="hello@example.com" />
          </div>

          {/* Audience */}
          <div className="space-y-2">
            <Label htmlFor="audience">Who Is This Course For?</Label>
            <Input id="audience" placeholder="hello@example.com" />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email Address</Label>
              <Input id="email" type="email" placeholder="hello@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collab">Do you want to collaborate?</Label>
              <Input id="collab" placeholder="Yes/No" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 text-lg"
          >
            Submit Course Idea
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestCourseModal;
