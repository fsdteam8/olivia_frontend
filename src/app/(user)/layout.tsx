import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import UserDashboardShell from "./_components/UserDashboardShell";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/user-dashboard");
  return <UserDashboardShell>{children}</UserDashboardShell>;
}
