"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  ArrowUpRight,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { title: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
  { title: "Promote Me", href: "/user-dashboard/promote-me", icon: Megaphone },
];

export default function UserDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const name = session?.user?.name || "My Account";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const title =
    navigation.find((item) => item.href === pathname)?.title ||
    "User Dashboard";

  const sidebar = (
    <div className="flex h-full flex-col bg-white">
      <Link
        href="/user-dashboard"
        onClick={() => setOpen(false)}
        className="flex h-24 shrink-0 items-center gap-3 border-b border-gray-100 px-6"
      >
        <Image
          src="/logo.png"
          alt="Act on Climate"
          width={80}
          height={64}
          className="h-14 w-auto object-contain"
        />
      </Link>
      <nav
        aria-label="User dashboard"
        className="flex-1 space-y-2 overflow-y-auto p-4"
      >
        <p className="px-3 py-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          My workspace
        </p>
        {navigation.map(({ title, href, icon: Icon }) => {
          const active =
            href === "/user-dashboard"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${active ? "bg-[#004242] text-white" : "text-gray-600 hover:bg-[#004242]/5 hover:text-[#004242]"}`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{title}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-gray-100 p-4">
        <Link
          href="/"
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
        >
          Visit website
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#f4f7f6] text-[#181919]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-gray-200 lg:block">
        {sidebar}
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open navigation"
                  className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 gap-0 p-0">
                <SheetTitle className="sr-only">
                  User dashboard navigation
                </SheetTitle>
                {sidebar}
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-lg font-semibold text-[#004242]">{title}</p>
              <p className="text-xs text-gray-500">Your personal workspace</p>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="max-w-52 truncate text-sm font-semibold">{name}</p>
              <p className="max-w-52 truncate text-xs text-gray-500">
                {session?.user?.email}
              </p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.profileImage} alt={name} />
              <AvatarFallback className="bg-[#004242]/10 font-semibold text-[#004242]">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="mx-auto  p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
