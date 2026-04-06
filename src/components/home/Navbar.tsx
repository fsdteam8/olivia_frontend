// import React from 'react';
// import { Button } from "@/components/ui/button";
// import Image from 'next/image';

// export const Navbar = () => {
//   return (
//     <div >
//     <nav className="container flex items-center justify-between px-8 py-4 sticky  top-0 z-50">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//         <Image src="/logo.png" alt="sktch Labs Logo" width={80} height={84} />
//       </div>

//       {/* Nav Links */}
//       <div className="hidden md:flex items-center gap-8">
//         {['Home', 'About', 'Courses', 'Membership', 'Mentors & Coaches'].map((link) => (
//           <a key={link} href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
//             {link}
//           </a>
//         ))}
//       </div>

//       {/* Auth Actions */}
//       <div className="flex items-center gap-3">
//         <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md px-6 text-xs ">
//           Join Community
//         </Button>
//         <Button variant="outline" className="border-gray-300 text-gray-700 rounded-md px-6 text-xs ">
//           Login
//         </Button>
//       </div>
//     </nav>
//     </div>
//   );
// };

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="sktch Labs Logo" width={80} height={84} />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Courses", "Membership", "Mentors & Coaches"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
              >
                {link}
              </a>
            ),
          )}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md px-6 text-xs ">
            Join Community
          </Button>

          <Link href={`/login`}>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 rounded-md px-6 text-xs "
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};
