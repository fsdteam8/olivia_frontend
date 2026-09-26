import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/auth-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
      }}
      className="min-h-screen w-full flex items-center justify-center py-8 px-4 sm:px-6"
    >
      {children}
    </div>
  );
};

export default Layout;
