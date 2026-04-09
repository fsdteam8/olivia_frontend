"use client";

import Image from "next/image";
import { Clock, Search } from "lucide-react";
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
import { useState, useMemo, useDeferredValue, useEffect } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDeferredValue(searchTerm);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

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
  const { data, isLoading, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["courses", currentPage, selectedCategory],
    queryFn: async () => {
      const categoryParam =
        selectedCategory !== "All Courses"
          ? `&category=${encodeURIComponent(selectedCategory)}`
          : "";

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all?page=${currentPage}&limit=100${categoryParam}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  const allCourses = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  // Filter courses based on search term
  useEffect(() => {
    if (!allCourses.length) {
      setFilteredCourses([]);
      return;
    }

    if (!debouncedSearchTerm.trim()) {
      setFilteredCourses(allCourses);
    } else {
      const filtered = allCourses.filter((course) =>
        course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredCourses(filtered);
    }
  }, [allCourses, debouncedSearchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  // Paginate filtered courses
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, currentPage]);

  const totalFilteredPages = Math.ceil(filteredCourses.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchTerm(""); // Clear search when changing category
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
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
    const pagesToShow = totalFilteredPages;

    if (pagesToShow <= maxVisible) {
      for (let i = 1; i <= pagesToShow; i++) {
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
      const end = Math.min(pagesToShow - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i === 1 || i === pagesToShow) continue;
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

      if (currentPage < pagesToShow - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={pagesToShow}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagesToShow);
            }}
            isActive={currentPage === pagesToShow}
            className={
              currentPage === pagesToShow
                ? "bg-[#B4C7C7] text-[#004242] hover:bg-[#B4C7C7] border-none"
                : "border-none hover:bg-gray-100"
            }
          >
            {pagesToShow}
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

  const showNoResults =
    !isLoading && filteredCourses.length === 0 && searchTerm;

  return (
    <section>
      <div className="container">
        {/* Filter Bar & Search */}
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

          {/* Search Input */}
          <div className="relative flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search courses by title..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-none focus-visible:ring-0 w-64 h-11 text-sm px-10"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {!isLoading && searchTerm && (
          <div className="mb-6 text-sm text-gray-600">
            Found {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} for &quot;{searchTerm}
            &quot;
          </div>
        )}

        {/* No Results Found */}
        {showNoResults && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl mb-16">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              We couldn&apos;t find any courses matching &quot;{searchTerm}
              &quot;
            </p>
            <Button
              onClick={handleClearSearch}
              className="mt-4 bg-[#004242] hover:bg-[#003333]"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Course Grid */}
        {!showNoResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CourseCardSkeleton key={`skeleton-${index}`} />
                  ))
                : paginatedCourses.map((course) => {
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
                            {course.lessonCount} lessons •{" "}
                            {course.totalEnrolled} enrolled
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
            {!isLoading && totalFilteredPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
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
                          if (currentPage < totalFilteredPages)
                            handlePageChange(currentPage + 1);
                        }}
                        className={
                          currentPage === totalFilteredPages
                            ? "pointer-events-none opacity-50 border-none hover:bg-gray-100"
                            : "border-none hover:bg-gray-100"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CourseListSection;
