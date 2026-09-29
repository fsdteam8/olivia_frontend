export interface StripeConnectStatus {
  connected: boolean;
  status: "not_connected" | "pending" | "active" | "restricted";
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  stripeConnectAccountId?: string;
  stripeConnectOnboardedAt?: string;
}

export type CourseFormat =
  | "online_cohort"
  | "online_self_paced"
  | "in_person"
  | "hybrid"
  | "workshop"
  | "short_course"
  | "certificate_program";

export type CourseStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "revision_requested"
  | "approved"
  | "rejected"
  | "archived";

export interface CourseLesson {
  title: string;
  videoUrl: string;
  duration?: string;
  level?: string;
}

export interface PartnerCourse {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  categories?: string[];
  difficulty?: string;
  durationHours?: number;
  estimatedWeeks?: number;
  duration?: string;
  price?: number;
  courseBoxUrl?: string;
  enrollmentUrl?: string;
  instructorName?: string;
  instructorBio?: string;
  instructorDetails?: string;
  instructorImage?: {
    url: string;
    public_id: string;
  };
  image?: {
    url: string;
    public_id: string;
  };
  coverImage?: {
    url: string;
    public_id: string;
  };
  lessons?: CourseLesson[];
  description?: string;
  summary?: string;
  learningOutcomes?: string[];
  targetAudience?: string;
  isAvailable?: boolean;
  isFree?: boolean;
  currency?: string;
  totalEnrolled?: number;
  source?: string;
  status: CourseStatus;
  providerId?: any;
  userId?: any;
  format?: CourseFormat;
  hasCertificate?: boolean;
  certificateDetails?: string;
  prerequisites?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  viewCount?: number;
  clickCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartnerCoursesMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export const COURSE_CATEGORIES = [
  "Beginner Courses",
  "Professional Development Courses",
  "Business Courses",
  "Educational Courses",
  "Insight Courses",
];

export const DIFFICULTY_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const FORMAT_OPTIONS: { label: string; value: CourseFormat }[] = [
  { label: "Online Cohort-based", value: "online_cohort" },
  { label: "Online Self-paced", value: "online_self_paced" },
  { label: "In-Person", value: "in_person" },
  { label: "Hybrid (Online & In-Person)", value: "hybrid" },
  { label: "Interactive Workshop", value: "workshop" },
  { label: "Short Course", value: "short_course" },
  { label: "Executive Certificate Program", value: "certificate_program" },
];

export const PRESET_CATEGORIES = COURSE_CATEGORIES;

export const CURRENCY_OPTIONS = ["USD", "CAD", "EUR", "GBP", "AUD"];

export const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  approved: {
    label: "Approved",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  submitted: {
    label: "Under Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  under_review: {
    label: "Under Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  in_review: {
    label: "In Review",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  revision_requested: {
    label: "Revision Requested",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  draft: {
    label: "Draft",
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};
