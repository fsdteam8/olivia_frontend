"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
}

interface EnrollmentData {
  _id: string;
  userId: string;
  courseId: Course;
  transactionId: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EnrollmentData;
}

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage("No session ID found. Please contact support.");
        return;
      }

      const token = session?.user?.accessToken;
      if (!token) {
        setStatus("error");
        setErrorMessage("Authentication required. Please login again.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/enrollment/verify-payment?session_id=${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data: ApiResponse = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setEnrollmentData(data.data);
        } else {
          setStatus("error");
          setErrorMessage(
            data.message ||
              "Payment verification failed. Please contact support.",
          );
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
        setErrorMessage(
          "An error occurred while verifying your payment. Please contact support.",
        );
      }
    };

    verifyPayment();
  }, [sessionId, session?.user?.accessToken]);

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#004242] animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Verifying Your Payment
          </h2>
          <p className="text-gray-500">
            Please wait while we confirm your transaction...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <div className="space-y-3">
            <Link href={`/courses`}>
              <Button
                onClick={() => router.push("/courses")}
                className="w-full bg-[#004242] hover:bg-[#003333]"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  const course = enrollmentData?.courseId;
  const enrollmentDate = enrollmentData?.createdAt
    ? new Date(enrollmentData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. You now have full access to your
            course.
          </p>
        </div>

        {/* Enrollment Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-[#004242] px-6 py-4">
            <h2 className="text-white text-xl font-semibold">
              Enrollment Details
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="text-gray-800 font-mono text-sm">
                {enrollmentData?.transactionId?.slice(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Status:</span>
              <span className="text-green-600 font-semibold capitalize">
                {enrollmentData?.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600">Enrollment Date:</span>
              <span className="text-gray-800">{enrollmentDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Course Access:</span>
              <span className="text-green-600 font-semibold">
                Lifetime Access
              </span>
            </div>
          </div>
        </div>

        {/* Course Information Card */}
        {course && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={getImageUrl(course.image.url)}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-white/95 text-[#004242] text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#004242] mb-3">
                {course.title}
              </h3>

              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Lessons
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {course.lessonCount} Units
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {course.totalDuration}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Amount Paid
                  </p>
                  <p className="text-green-600 font-bold text-lg">
                    {course.currency} {course.price}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Congratulations! You&apos;ve successfully enrolled in &quot;
                {course.title}&quot;. Start learning today and master new skills
                at your own pace.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/courses/${course?._id}/enroll-course`}>
            <Button className="bg-[#004242] hover:bg-[#003333] text-white px-8 py-6 text-lg group">
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="px-8 py-6 text-lg">
              <BookOpen className="mr-2 w-5 h-5" />
              Browse More Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
