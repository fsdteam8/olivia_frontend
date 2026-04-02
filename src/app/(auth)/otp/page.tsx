import { Suspense } from "react";
import OtpForm from "./_components/otp-form";

export default function OtpPage() {
  return (
    <div className="container">
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <OtpForm />
        </Suspense>
      </div>
    </div>
  );
}
