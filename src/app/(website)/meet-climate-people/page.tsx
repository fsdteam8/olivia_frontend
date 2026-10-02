import type { Metadata } from "next";
import { ProfileDirectory } from "./_components/profiles";
export const metadata: Metadata = {
  title: "Meet Climate People",
  description: "Discover and connect with people in the climate community.",
};
export default function Page() {
  return <ProfileDirectory />;
}
