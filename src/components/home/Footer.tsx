import React from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react"; // Using lucide-react for icons
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#EEF4F5] pt-16 pb-8 px-6 md:px-20 border-t border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="sktch Labs Logo"
                width={80}
                height={84}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We Must Explain to you how all this mistaken idea of denouncing
              pleasure... (repeated placeholder text as per design)
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className=" text-[#004242] mb-6">Products</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  FAQ&apos;s
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className=" text-[#004242] mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004242] hover:text-green-600">
                  Investors
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Contact */}
          <div className="space-y-8 ">
            <div>
              <h4 className=" text-[#004242] mb-6">Follow us</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Twitter size={18} />
                </a>
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#004242] mb-4">Contact us</h4>
              <div className="bg-[#004242] text-white font-bold text-sm py-2  rounded-md text-center">
                info@actonclimate.net
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:row justify-between items-center text-xs text-gray-400">
          <p>© Copyright 2024. All Rights Reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#">Privacy policy</a>
            <span>•</span>
            <a href="#">Terms & conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
