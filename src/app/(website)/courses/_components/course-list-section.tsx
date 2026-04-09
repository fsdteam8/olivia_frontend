"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

interface Course {
  _id: string;
  title: string;
  category: string;
  lessonCount: number;
  totalDuration: string;
  price: number;
  currency: string;
  isAvailable: boolean;
  totalEnrolled: number;
  image: {
    url: string;
    public_id: string;
  };
  lessons: Array<{
    title: string;
    duration: string;
    level: string;
    videoUrl: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Course[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full">
    <div className="relative aspect-[16/10] w-full">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-5 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

const CategorySkeleton = () => (
  <Skeleton className="h-10 px-5 rounded-md w-32" />
);

const CourseListSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [email, setEmail] = useState("");

  // Fetch all courses first to get categories
  const { data: allCoursesData, isLoading: isLoadingCategories } =
    useQuery<ApiResponse>({
      queryKey: ["all-courses"],
      queryFn: async () => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all?limit=100`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      },
    });

  // Get unique categories from all courses
  const dynamicCategories = useMemo(() => {
    if (!allCoursesData?.data) return ["All Courses"];

    const uniqueCategories = new Set<string>();
    uniqueCategories.add("All Courses");

    allCoursesData.data.forEach((course) => {
      if (course.category) {
        uniqueCategories.add(course.category);
      }
    });

    return Array.from(uniqueCategories);
  }, [allCoursesData]);

  // Fetch paginated courses with category filter
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["courses", currentPage, selectedCategory],
    queryFn: async () => {
      const categoryParam =
        selectedCategory !== "All Courses"
          ? `&category=${encodeURIComponent(selectedCategory)}`
          : "";

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all?page=${currentPage}&limit=6${categoryParam}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  const courses = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSubscribe = async () => {
    if (!email) return;
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const getLevelFromLessons = (lessons: Course["lessons"]) => {
    if (!lessons || lessons.length === 0) return "Beginner";
    const levels = lessons.map((l) => l.level.toLowerCase());
    if (levels.includes("advanced")) return "Advanced";
    if (levels.includes("intermediate")) return "Intermediate";
    return "Beginner";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-500 bg-green-50";
      case "Intermediate":
        return "text-blue-500 bg-blue-50";
      case "Advanced":
        return "text-purple-500 bg-purple-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
              className={
                currentPage === i
                  ? "bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none"
                  : "border-none hover:bg-gray-100"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={currentPage === 1}
            className={
              currentPage === 1
                ? "bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none"
                : "border-none hover:bg-gray-100"
            }
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i === 1 || i === totalPages) continue;
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
              className={
                currentPage === i
                  ? "bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none"
                  : "border-none hover:bg-gray-100"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            isActive={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none"
                : "border-none hover:bg-gray-100"
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading courses. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#004242] hover:bg-[#003333]"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        {/* Filter Bar & Newsletter Subscription */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-5 gap-5">
          <div className="flex flex-wrap gap-3">
            {isLoadingCategories
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CategorySkeleton key={`category-skeleton-${index}`} />
                ))
              : dynamicCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant="ghost"
                    onClick={() => handleCategoryChange(cat)}
                    className={`h-10 px-5 rounded-md text-sm hero-font ${
                      selectedCategory === cat
                        ? "bg-[#004242] text-white hover:bg-[#003333] hover:text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border-none shadow-sm"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none focus-visible:ring-0 w-64 h-11 text-sm px-4"
            />
            <Button
              onClick={handleSubscribe}
              className="bg-[#004242] hover:bg-[#003333] text-white h-11 px-6 rounded-none hero-font"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CourseCardSkeleton key={`skeleton-${index}`} />
              ))
            : courses.map((course) => {
                const level = getLevelFromLessons(course.lessons);
                const levelColor = getLevelColor(level);
                const formattedPrice = formatPrice(
                  course.price,
                  course.currency,
                );
                const isFree = course.price === 0;

                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
                  >
                    {/* Card Header Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={getImageUrl(course.image.url)}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/95 text-black hover:bg-white border-none px-3 py-1 text-[10px] tracking-widest shadow-sm">
                        {course.category}
                      </Badge>
                      {/* Price Badge */}
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-bold shadow-sm bg-[#004242] text-white`}
                      >
                        {formattedPrice}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${levelColor}`}
                        >
                          {level}
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium">
                          <Clock size={15} className="text-[#004242]" />
                          {course.totalDuration}
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-[#004242] mb-3 leading-snug line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-4">
                        {course.lessonCount} lessons • {course.totalEnrolled}{" "}
                        enrolled
                      </p>

                      {/* Price and Button Section */}
                      <div className="mt-auto space-y-3">
                        {!isFree && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#004242]">
                              {formattedPrice}
                            </span>
                            <span className="text-gray-400 text-xs">
                              one-time payment
                            </span>
                          </div>
                        )}

                        <Link href={`/courses/${course._id}`}>
                          <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg text-sm transition-colors">
                            Enroll Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Pagination Section */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50 border-none hover:bg-gray-100"
                        : "border-none hover:bg-gray-100"
                    }
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 border-none hover:bg-gray-100"
                        : "border-none hover:bg-gray-100"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseListSection;
