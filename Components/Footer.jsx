import React from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';

const Footer = () => {
  return (
    <footer className="bg-[#0F1123] text-white py-6 px-6 sm:px-16 mt-10 border-t border-[#2A2D48]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        {/* Logo (scaled & padded) */}
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-md">
            <Image src={assets.logo_light} alt="Logo" width={100} height={40} />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Blogger. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Image src={assets.facebook_icon} alt="Facebook" width={28} className="hover:scale-110 transition" />
          <Image src={assets.twitter_icon} alt="Twitter" width={28} className="hover:scale-110 transition" />
          <Image src={assets.googleplus_icon} alt="Google Plus" width={28} className="hover:scale-110 transition" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
