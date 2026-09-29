"use client";

import React from "react";
import PartnerCoursesManager from "./_components/PartnerCoursesManager";

export default function PartnerCoursesPage() {
  return (
    <div className="space-y-6 pb-12">
      <PartnerCoursesManager showHeader={true} />
    </div>
  );
}
