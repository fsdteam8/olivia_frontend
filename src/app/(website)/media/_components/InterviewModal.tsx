// "use client"

// import React from "react"
// import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"

// const InterviewModal = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: (open: boolean) => void }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={setOpen}>
//       <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">

//         {/* Header Section */}
//         <div className="pt-10 pb-6 text-center border-b border-slate-50">
//           <DialogTitle className="text-[#004242] text-3xl  font-normal mb-2">
//             Apply to do an Interview with Us
//           </DialogTitle>
//           <DialogDescription className="text-[#729094] text-xs font-medium max-w-lg mx-auto">
//             Act on Climate is looking for experts who want to do in-depth interviews with us on a whole range of climate topics.
//           </DialogDescription>
//         </div>

//         <form className="p-8 space-y-6">

//           {/* Section 1: Basic Information */}
//           <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
//             <div className="space-y-1.5">
//               <Label className="text-[#004242]  text-[11px]">Name</Label>
//               <Input placeholder="Enter your name" className="h-10 border-slate-200" />
//             </div>

//             <div className="space-y-1.5">
//               <Label className="text-[#004242]  text-[11px]">Email Address</Label>
//               <Input placeholder="Your email address" type="email" className="h-10 border-slate-200" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <Label className="text-[#004242]  text-[11px]">Climate Change Topics Specialization</Label>
//                 <Select>
//                   <SelectTrigger className="h-10 border-slate-200 text-[#729094]">
//                     <SelectValue placeholder="Renewable Energy" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="energy">Renewable Energy</SelectItem>
//                     <SelectItem value="policy">Climate Policy</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-1.5">
//                 <Label className="text-[#004242]  text-[11px]">Industry</Label>
//                 <Select>
//                   <SelectTrigger className="h-10 border-slate-200 text-[#729094]">
//                     <SelectValue placeholder="Education" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="edu">Education</SelectItem>
//                     <SelectItem value="tech">Technology</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Section 2: About & Focus */}
//           <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
//             <h3 className="text-[#004242] font-normal text-sm">About You</h3>
//             <div className="space-y-1.5">
//               <Label className="text-[#004242]  text-[11px]">Professional Background</Label>
//               <Textarea placeholder="short bio or career summary" className="min-h-[80px] border-slate-200 italic placeholder:text-slate-300" />
//             </div>
//             <div className="space-y-1.5">
//               <Label className="text-[#004242]  text-[11px]">Podcast Focus Preference</Label>
//               <Textarea placeholder="what they'd like the podcast to be about" className="min-h-[80px] border-slate-200 italic placeholder:text-slate-300" />
//             </div>
//           </div>

//           {/* Section 3: Questions & Schedule */}
//           <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
//             <h3 className="text-[#004242] font-normal text-sm">Preferred Questions</h3>
//             <div className="space-y-1.5">
//               <Label className="text-[#004242] font-normal text-[11px]">Preferred Questions</Label>
//               <div className="flex gap-2">
//                 <Input placeholder="List the questions you'd like us to ask during the interview" className="h-10 border-slate-200 italic placeholder:text-slate-300" />
//                 <Button type="button" variant="outline" className="px-3 border-slate-200 text-[#004242]">
//                   <Plus size={18} />
//                 </Button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
//               <div className="space-y-1.5">
//                 <Label className="text-[#004242]  text-[11px]">Date</Label>
//                 <div className="relative">
//                   <Input placeholder="Pick a perfect date" className="pl-10 h-10 border-slate-200 italic" />
//                   <CalendarIcon className="absolute left-3 top-2.5 text-slate-400" size={18} />
//                 </div>
//               </div>
//               <div className="space-y-1.5">
//                 <Label className="text-[#004242]  text-[11px]">Time</Label>
//                 <div className="relative">
//                   <Input placeholder="Set time" className="pl-10 h-10 border-slate-200 italic" />
//                   <Clock className="absolute left-3 top-2.5 text-slate-400" size={18} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg  text-md transition-all active:scale-[0.98]">
//             Submit
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default InterviewModal

"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const climateTopics = [
  "Climate Science",
  "Climate Policy",
  "Climate Justice",
  "Renewable Energy",
  "Sustainability",
  "Climate Tech",
  "Other",
];

const industries = [
  "Non-profit",
  "Government",
  "Private Sector",
  "Startup",
  "Academia",
  "Research",
  "Consulting",
  "Other",
];

const InterviewModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [bio, setBio] = useState("");
  const [focus, setFocus] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addQuestion = () => {
    if (currentQuestion.trim() === "") return;
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      topic,
      industry,
      bio,
      focus,
      questions,
      date,
      time,
    };
    console.log("Interview Form Data:", formData);
    alert("Form submitted! Check console for data.");
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">
        {/* Header */}
        <div className="pt-10 pb-6 text-center border-b border-slate-50">
          <DialogTitle className="text-[#004242] text-3xl font-normal mb-2">
            Apply to do an Interview with Us
          </DialogTitle>
          <DialogDescription className="text-[#729094] text-xs font-medium max-w-lg mx-auto">
            Act on Climate is looking for experts who want to do in-depth
            interviews with us on a whole range of climate topics.
          </DialogDescription>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="space-y-1.5">
              <Label className="text-[#004242]  text-[11px]">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-10 border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[#004242]  text-[11px]">
                Email Address
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email address"
                className="h-10 border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[#004242]  text-[11px]">
                  Climate Change Topics Specialization
                </Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger className="h-10 w-full border-slate-200 text-[#729094]">
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {climateTopics.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#004242]  text-[11px]">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="h-10  w-full border-slate-200 text-[#729094]">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* About & Focus */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-[#004242] font-normal text-sm">About You</h3>
            <div className="space-y-1.5">
              <Label className="text-[#004242]  text-[11px]">
                Professional Background
              </Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio or career summary"
                className="min-h-[80px] border-slate-200 italic placeholder:text-slate-300"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#004242]  text-[11px]">
                Podcast Focus Preference
              </Label>
              <Textarea
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="What they'd like the podcast to be about"
                className="min-h-[80px] border-slate-200 italic placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Questions & Schedule */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-[#004242] font-normal text-sm">
              Preferred Questions
            </h3>
            <div className="flex gap-2">
              <Input
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="List the questions you'd like us to ask"
                className="h-10 border-slate-200 italic placeholder:text-slate-300"
              />
              <Button
                type="button"
                variant="outline"
                className="px-3 border-slate-200 text-[#004242]"
                onClick={addQuestion}
              >
                <Plus size={18} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {questions.map((q, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 px-2 py-1 rounded text-sm"
                >
                  {q}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-[#004242]  text-[11px]">Date</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 h-10 border-slate-200 italic"
                  />
                  <CalendarIcon
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#004242]  text-[11px]">Time</Label>
                <div className="relative">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10 h-10 border-slate-200 italic"
                  />
                  <Clock
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg  text-md transition-all active:scale-[0.98]"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewModal;
