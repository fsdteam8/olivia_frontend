import type { Metadata } from "next";
import { ProfileDirectory } from "./_components/profiles";
export const metadata: Metadata = {
  title: "Meet the Act on Climate Community | Act on Climate",
  description:
    "Discover and connect with sustainability leaders, climate tech innovators, and changemakers in the Act on Climate Community.",
};
export default function Page() {
  return <ProfileDirectory />;
}
