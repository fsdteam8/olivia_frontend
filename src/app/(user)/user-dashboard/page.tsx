import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#008080]">
          User dashboard
        </p>
        <h1 className="text-3xl font-semibold text-[#004242]">
          Welcome to your workspace
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Manage your presence and share what you do with the community.
        </p>
      </div>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#004242]/5 text-[#004242]">
          <Megaphone className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-semibold text-[#004242]">
          Let the community discover you
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
          Use Promote Me to create and update your profile on the website.
          Publishing will require an active subscription plan.
        </p>
        <Link
          href="/user-dashboard/promote-me"
          className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#004242] px-5 py-3 text-sm font-semibold text-white hover:bg-[#053535]"
        >
          Promote Me
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
