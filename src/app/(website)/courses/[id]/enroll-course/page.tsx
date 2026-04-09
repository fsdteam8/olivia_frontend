import React from "react";
import EnrollCourse from "./_components/enroll-course";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <EnrollCourse />
    </div>
  );
};

export default page;
