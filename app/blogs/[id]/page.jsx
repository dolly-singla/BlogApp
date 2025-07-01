'use client';

import { assets } from '@/Assets/assets';
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';

const page = ({ params: paramsPromise }) => {
  const params = use(paramsPromise); // ✅ unwrap the promise

  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: { id: params.id }
    });

    setData(response.data.blog); // ✅ Extract blog field
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      {/* Header */}
      <div className="bg-[#0F1123] text-white py-6 px-6 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo_light} width={120} height={50} alt="Logo" className="cursor-pointer" />
          </Link>
          <button className="flex items-center gap-2 font-medium py-2 px-4 border border-white bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:scale-105 transition">
            Get Started
            <Image src={assets.arrow} width={18} height={10} alt="Arrow" />
          </button>
        </div>

        <div className="text-center my-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text max-w-3xl mx-auto leading-tight">
            {data.title}
          </h1>

          <div className="mt-6 flex flex-col items-center gap-1">
            <Image
              className="border border-white rounded-full"
              src={data.author_img || '/author_img.jpeg'}
              width={60}
              height={60}
              alt="Author"
            />
            <p className="text-base text-gray-300">{data.author}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#0F1123] text-white px-5 md:px-0 max-w-[850px] mx-auto mt-[-80px] mb-24">
        <Image
          className="border-4 border-white rounded-md w-full"
          src={data.image}
          width={1280}
          height={720}
          alt="Blog"
        />

        <div
          className="blog-content mt-10 text-lg leading-7 text-gray-300"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Share Section */}
        <div className="mt-20">
          <p className="text-white font-semibold mb-4">Share this article on social media</p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} width={32} alt="Facebook" className="hover:scale-110 transition" />
            <Image src={assets.twitter_icon} width={32} alt="Twitter" className="hover:scale-110 transition" />
            <Image src={assets.googleplus_icon} width={32} alt="Google Plus" className="hover:scale-110 transition" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
