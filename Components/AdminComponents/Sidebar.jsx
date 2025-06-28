'use client'

import { assets } from '@/Assets/assets'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/admin/addProduct',
      label: 'Add Blogs',
      icon: assets.add_icon,
    },
    {
      href: '/admin/blogList',
      label: 'Blog List',
      icon: assets.blog_icon,
    },
    {
      href: '/admin/subscriptions',
      label: 'Subscriptions',
      icon: assets.email_icon,
    },
  ];

  return (
    <div className='flex flex-col bg-[#1a1d2d] min-h-screen border-r border-gray-700 w-28 sm:w-72'>
      <div className='px-6 py-4 border-b border-gray-700'>
        <Image src={assets.logo} width={120} height={50} alt='Logo' />
      </div>

      <nav className='mt-10 flex flex-col gap-6 px-4'>
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all
              ${pathname === href
                ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'}
            `}
          >
            <Image src={icon} alt='' width={24} height={24} />
            <span className='hidden sm:inline'>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

