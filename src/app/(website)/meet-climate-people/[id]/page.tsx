import { ProfileDetails } from "../_components/profiles";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProfileDetails id={id} />;
}
