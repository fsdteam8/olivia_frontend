// "use client";
// import Image from "next/image";
// import { Calendar, Eye, Share2 } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// interface MediaItem {
//   _id: string;
//   title: string;
//   mediaType: string;
//   description: string;
//   contentUrl: string;
//   thumbnailImage: string;
//   createdAt: string;
// }

// interface ApiResponse {
//   success: boolean;
//   data: MediaItem[];
// }

// interface SingleApiResponse {
//   success: boolean;
//   data: MediaItem;
// }

// const fetchSingleMedia = async (id: string): Promise<MediaItem> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-single-media/${id}`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch media");
//   }

//   const data: SingleApiResponse = await res.json();
//   return data.data;
// };

// const fetchMedia = async (): Promise<MediaItem[]> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-media`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch media");
//   }

//   const data: ApiResponse = await res.json();
//   return data.data;
// };

// const VideoLessonDetail = () => {
//   const params = useParams();
//   const id = params?.id as string;

//   const {
//     data: media,
//     isLoading: mediaLoading,
//     error: mediaError,
//   } = useQuery({
//     queryKey: ["media-posts"],
//     queryFn: fetchMedia,
//   });

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["single-media", id],
//     queryFn: () => fetchSingleMedia(id),
//     enabled: !!id,
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-40 text-lg font-semibold">
//         Loading media...
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="text-center py-40 text-red-500">Failed to load media</div>
//     );
//   }

//   return (
//     <div className="mt-32 pb-[64px]">
//       <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
//         {/* MAIN CONTENT */}
//         <div className="lg:col-span-8 space-y-8">
//           {/* Video */}
//           <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
//             {data.mediaType === "video" ? (
//               <iframe
//                 src={data.contentUrl.replace(
//                   "youtu.be/",
//                   "www.youtube.com/embed/",
//                 )}
//                 className="w-full h-full"
//                 allowFullScreen
//               />
//             ) : (
//               <Image
//                 src={data.thumbnailImage}
//                 alt={data.title}
//                 fill
//                 className="object-cover"
//               />
//             )}

//             <div className="absolute bottom-6 left-6 bg-[#004242] text-[10px] text-white px-3 py-1.5 rounded-full">
//               {data.mediaType}
//             </div>
//           </div>

//           {/* Title */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-6 text-[#729094] text-[10px] uppercase tracking-widest">
//               <span className="text-[#004242]">{data.mediaType}</span>

//               <div className="flex items-center gap-1.5">
//                 <Calendar size={14} />
//                 {new Date(data.createdAt).toDateString()}
//               </div>

//               <div className="flex items-center gap-1.5">
//                 <Eye size={14} /> Views
//               </div>
//             </div>

//             <h1 className="text-[#004242] text-3xl md:text-4xl leading-tight">
//               {data.title}
//             </h1>
//           </div>

//           {/* Description */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <h3 className="text-[#004242] text-sm border-b-2 border-[#004242] w-fit pb-1">
//               Description
//             </h3>

//             <p className="text-[#729094] text-sm leading-relaxed font-medium">
//               {data.description}
//             </p>
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <div className="lg:col-span-4 space-y-10">
//           {/* Recommended */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-2 text-[#004242] text-sm">
//               <Share2 size={16} />
//               Recommended Next
//             </div>

//             <div className="space-y-4">
//               {media?.slice(0, 3).map((item) => (
//                 <Link
//                   href={`/media/${item._id}`}
//                   key={item._id}
//                   className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer"
//                 >
//                   <div key={item._id}>
//                     <div className="relative h-40 w-full">
//                       <Image
//                         src={item.thumbnailImage}
//                         alt={item.title}
//                         fill
//                         className="object-cover"
//                       />

//                       <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
//                         {item.mediaType}
//                       </div>
//                     </div>

//                     <div className="p-3 space-y-2">
//                       <h5 className="text-[#004242] text-[11px] font-extrabold line-clamp-2 leading-tight uppercase">
//                         {item.title}
//                       </h5>

//                       <p className="text-[#94a3b8] text-[9px] tracking-wider">
//                         {new Date(item.createdAt).toDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoLessonDetail;

"use client";
import Image from "next/image";
import { Calendar, Eye, Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaItem {
  _id: string;
  title: string;
  mediaType: string;
  description: string;
  contentUrl: string;
  thumbnailImage: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: MediaItem[];
}

interface SingleApiResponse {
  success: boolean;
  data: MediaItem;
}

const fetchSingleMedia = async (id: string): Promise<MediaItem> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-single-media/${id}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  const data: SingleApiResponse = await res.json();
  return data.data;
};

const fetchMedia = async (): Promise<MediaItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-media`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  const data: ApiResponse = await res.json();
  return data.data;
};

const VideoLessonDetail = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data: media, isLoading: mediaLoading } = useQuery({
    queryKey: ["media-posts"],
    queryFn: fetchMedia,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["single-media", id],
    queryFn: () => fetchSingleMedia(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mt-32 pb-[64px]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN CONTENT SKELETON */}
          <div className="lg:col-span-8 space-y-8">
            <Skeleton className="w-full aspect-video rounded-2xl" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* SIDEBAR SKELETON */}
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-5 w-40" />

            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-3">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-40 text-red-500">Failed to load media</div>
    );
  }

  return (
    <div className="mt-32 pb-[64px]">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
            {data.mediaType === "video" ? (
              <iframe
                src={data.contentUrl.replace(
                  "youtu.be/",
                  "www.youtube.com/embed/",
                )}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <Image
                src={data.thumbnailImage}
                alt={data.title}
                fill
                className="object-cover"
              />
            )}

            <div className="absolute bottom-6 left-6 bg-[#004242] text-[10px] text-white px-3 py-1.5 rounded-full">
              {data.mediaType}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-[#729094] text-[10px] uppercase tracking-widest">
              <span className="text-[#004242]">{data.mediaType}</span>

              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(data.createdAt).toDateString()}
              </div>

              <div className="flex items-center gap-1.5">
                <Eye size={14} /> Views
              </div>
            </div>

            <h1 className="text-[#004242] text-3xl md:text-4xl leading-tight">
              {data.title}
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="text-[#004242] text-sm border-b-2 border-[#004242] w-fit pb-1">
              Description
            </h3>

            <p className="text-[#729094] text-sm leading-relaxed font-medium">
              {data.description}
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#004242] text-sm">
              <Share2 size={16} />
              Recommended Next
            </div>

            {mediaLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {media?.slice(0, 3).map((item) => (
                  <Link
                    href={`/media/${item._id}`}
                    key={item._id}
                    className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={item.thumbnailImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                        {item.mediaType}
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      <h5 className="text-[#004242] text-[11px] font-extrabold line-clamp-2 leading-tight uppercase">
                        {item.title}
                      </h5>

                      <p className="text-[#94a3b8] text-[9px] tracking-wider">
                        {new Date(item.createdAt).toDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessonDetail;
