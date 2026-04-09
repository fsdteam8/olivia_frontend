import React, { Suspense } from "react";
import PaymentSuccessPage from "./_components/payment-success-page";

const page = () => {
  return (
    <div className="mt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessPage />
      </Suspense>
    </div>
  );
};

export default page;
