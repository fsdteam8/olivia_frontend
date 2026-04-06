// import React from 'react';
// import Image from 'next/image';
// import { Play, Calendar, Eye, Share2,  } from 'lucide-react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const VideoLessonDetail = () => {
//   const recommendedNext = [
//     {
//       title: "The Hidden Cost of Solar: Recycling Old Panels",
//       meta: "ENVIRONMENT • 4.2K VIEWS",
//       duration: "15:02",
//       image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d"
//     },
//     {
//       title: "Innovating for Zero: Carbon Capture Tech",
//       meta: "TECHNOLOGY • 8.1K LISTENS",
//       isPodcast: true,
//       image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
//     },
//     {
//       title: "Beyond the Arctic: Global Sea Level Impact",
//       meta: "SCIENTIFIC ANALYSIS • 22K VIEWS",
//       duration: "26:45",
//       image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
//     }
//   ];

//   return (
//     <div className="bg-[#f8fafb] min-h-screen py-12 px-6 md:px-12 lg:px-20">
//       <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">

//         {/* MAIN VIDEO CONTENT */}
//         <div className="lg:col-span-8 space-y-8">
//           {/* Video Player Mockup */}
//           <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
//            <video src="https://www.pexels.com/download/video/20541526/"/>
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
//               <div className="w-16 h-16 bg-[#004242] rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
//                 <Play fill="white" size={28} className="ml-1" />
//               </div>
//             </div>
//             <div className="absolute bottom-6 left-6 bg-[#004242] text-[10px]  text-white px-3 py-1.5 rounded-full">
//               Expert Insights
//             </div>
//           </div>

//           {/* Title & Metadata */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-6 text-[#729094] text-[10px]  uppercase tracking-widest">
//               <span className="text-[#004242]">Video</span>
//               <div className="flex items-center gap-1.5">
//                 <Calendar size={14} /> Oct 24, 2023
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Eye size={14} /> 12.5k Views
//               </div>
//             </div>
//             <h1 className="text-[#004242] text-3xl md:text-4xl font-extrabold leading-tight">
//               The Future of Renewable Energy: Global Shifts 2024
//             </h1>
//           </div>

//           {/* Description Section */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <h3 className="text-[#004242] text-sm  border-b-2 border-[#004242] w-fit pb-1">Description</h3>
//             <p className="text-[#729094] text-sm leading-relaxed font-medium">
//               In this comprehensive deep-dive, Dr. Aris Thorne explores the critical tipping points in our
//               transition to a renewable-first power grid. We examine the latest breakthroughs in solar
//               efficiency, the geopolitical shifts in lithium production, and why the next 24 months are
//               pivotal for international climate targets.
//             </p>

//             <div className="space-y-4">
//               <h4 className="text-[#004242] text-lg font-extrabold">Key Discussion Points:</h4>
//               <ul className="text-[#729094] text-xs font-semibold space-y-2 list-disc pl-4">
//                 <li>The decline of fossil fuel subsidies and its impact on emerging markets.</li>
//                 <li>Solid-state battery technology: From labs to industrial scale.</li>
//                 <li>Community-led microgrids in developing nations.</li>
//                 <li>Policy frameworks that actually drive decarbonization.</li>
//               </ul>
//             </div>
//           </div>

//           {/* Comment Section */}
//           <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4">
//             <Input
//               placeholder="Write a comment..."
//               className="border-none bg-transparent focus-visible:ring-0 text-sm italic"
//             />
//             <Button size="sm" className="bg-[#004242] hover:bg-[#003333] px-6  rounded-lg">
//               Comment
//             </Button>
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <div className="lg:col-span-4 space-y-10">
//           {/* Recommended Next */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-2 text-[#004242]  text-sm">
//               <Share2 size={16} />
//               Recommended Next
//             </div>

//             <div className="space-y-4">
//               {recommendedNext.map((item, i) => (
//                 <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer">
//                   <div className="relative h-32 w-full">
//                     <Image src={item.image} alt={item.title} fill className="object-cover" />
//                     <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
//                       {item.isPodcast ? "Podcast" : item.duration}
//                     </div>
//                   </div>
//                   <div className="p-3 space-y-2">
//                     <h5 className="text-[#004242] text-[11px] font-extrabold line-clamp-2 leading-tight uppercase">
//                       {item.title}
//                     </h5>
//                     <p className="text-[#94a3b8] text-[9px]  tracking-wider">
//                       {item.meta}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Join the Action Newsletter */}
//           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
//             <h4 className="text-[#004242] text-sm font-extrabold uppercase tracking-tight">Join the Action</h4>
//             <p className="text-[#94a3b8] text-[10px]  leading-normal">
//               Get weekly updates on climate solutions and upcoming live talks.
//             </p>
//             <div className="space-y-3">
//               <Input
//                 placeholder="Your email"
//                 className="bg-slate-50 border-slate-200 text-xs placeholder:text-slate-300 h-10"
//               />
//               <Button className="w-full bg-[#004242] hover:bg-[#003333]  text-xs h-10">
//                 Subscribe Now
//               </Button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default VideoLessonDetail;

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Calendar, Eye, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VideoLessonDetail = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const [email, setEmail] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const recommendedNext = [
    {
      title: "The Hidden Cost of Solar: Recycling Old Panels",
      meta: "ENVIRONMENT • 4.2K VIEWS",
      duration: "15:02",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    },
    {
      title: "Innovating for Zero: Carbon Capture Tech",
      meta: "TECHNOLOGY • 8.1K LISTENS",
      isPodcast: true,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    },
    {
      title: "Beyond the Arctic: Global Sea Level Impact",
      meta: "SCIENTIFIC ANALYSIS • 22K VIEWS",
      duration: "26:45",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    },
  ];

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, commentText.trim()]);
    setCommentText("");
  };

  const handleSubscribe = () => {
    if (!email.trim()) return alert("Please enter an email");
    alert(`Subscribed successfully with ${email}`);
    setEmail("");
  };

  return (
    <div className="mt-32 pb-[64px]">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* MAIN VIDEO CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          {/* Video Player */}
          <div
            className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            onClick={handlePlayPause}
          >
            <video
              ref={videoRef}
              src="https://www.pexels.com/download/video/20541526"
              className="w-full h-full object-cover"
            />
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#004242] rounded-full flex items-center justify-center text-white shadow-lg">
                  <Play fill="white" size={28} className="ml-1" />
                </div>
              </div>
            )}
            <div className="absolute bottom-6 left-6 bg-[#004242] text-[10px]  text-white px-3 py-1.5 rounded-full">
              Expert Insights
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-[#729094] text-[10px]  uppercase tracking-widest">
              <span className="text-[#004242]">Video</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} /> Oct 24, 2023
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={14} /> 12.5k Views
              </div>
            </div>
            <h1 className="text-[#004242] text-3xl md:text-4xl leading-tight">
              The Future of Renewable Energy: Global Shifts 2024
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="text-[#004242] text-sm  border-b-2 border-[#004242] w-fit pb-1">
              Description
            </h3>
            <p className="text-[#729094] text-sm leading-relaxed font-medium">
              In this comprehensive deep-dive, Dr. Aris Thorne explores the
              critical tipping points in our transition to a renewable-first
              power grid. We examine the latest breakthroughs in solar
              efficiency, the geopolitical shifts in lithium production, and why
              the next 24 months are pivotal for international climate targets.
            </p>

            <div className="space-y-4">
              <h4 className="text-[#004242] text-lg ">
                Key Discussion Points:
              </h4>
              <ul className="text-[#729094] text-xs font-semibold space-y-2 list-disc pl-4">
                <li>
                  The decline of fossil fuel subsidies and its impact on
                  emerging markets.
                </li>
                <li>
                  Solid-state battery technology: From labs to industrial scale.
                </li>
                <li>Community-led microgrids in developing nations.</li>
                <li>Policy frameworks that actually drive decarbonization.</li>
              </ul>
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4">
              <Input
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="border-none bg-transparent focus-visible:ring-0 text-sm italic"
              />
              <Button
                size="sm"
                className="bg-[#004242] hover:bg-[#003333] px-6  rounded-lg"
                onClick={handleAddComment}
              >
                Comment
              </Button>
            </div>

            {/* Render Comments */}
            <div className="space-y-2">
              {comments.map((c, i) => (
                <p
                  key={i}
                  className="text-[#004242] text-xs font-medium bg-white border border-slate-100 rounded-xl p-2"
                >
                  {c}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-10">
          {/* Recommended Next */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#004242]  text-sm">
              <Share2 size={16} />
              Recommended Next
            </div>

            <div className="space-y-4">
              {recommendedNext.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                      {item.isPodcast ? "Podcast" : item.duration}
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <h5 className="text-[#004242] text-[11px] font-extrabold line-clamp-2 leading-tight uppercase">
                      {item.title}
                    </h5>
                    <p className="text-[#94a3b8] text-[9px]  tracking-wider">
                      {item.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-[#004242] text-sm font-extrabold uppercase tracking-tight">
              Join the Action
            </h4>
            <p className="text-[#94a3b8] text-[10px]  leading-normal">
              Get weekly updates on climate solutions and upcoming live talks.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-slate-200 text-xs placeholder:text-slate-300 h-10"
              />
              <Button
                className="w-full bg-[#004242] hover:bg-[#003333]  text-xs h-10"
                onClick={handleSubscribe}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessonDetail;
