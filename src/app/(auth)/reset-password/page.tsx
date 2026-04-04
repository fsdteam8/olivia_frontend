import { Suspense } from "react";
import ResetPasswordForm from "./_components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="container">
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
