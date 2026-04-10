import Footer from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
