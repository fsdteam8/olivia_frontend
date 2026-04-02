import Footer from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      <NextTopLoader color="#2563eb" easing="ease-in" showSpinner={false} />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
