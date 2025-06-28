'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="bg-[#0F1123] text-white py-10 px-5 sm:px-10 lg:px-28">
      {/* Top Nav */}
      <div className='flex justify-between items-center'>
        <Image
          src={assets.logo}
          width={100}
          height={50}
          alt='Logo'
          className='w-[130px] sm:w-auto'
        />
        <button className='flex items-center gap-2 font-medium py-2 px-5 bg-[#ff6b6b] hover:bg-[#ff8787] text-white rounded-md transition shadow-md'>
          Get Started
          <Image src={assets.arrow} width={18} height={10} alt='Arrow' />
        </button>
      </div>

      {/* Section Heading */}
      <div className='text-center my-2 sm:my-10'>
        {/* <p className="inline-block px-6 py-2 rounded-full border border-purple-400 text-sm mb-4">
          ✨ Our Creative Work
        </p> */}
        <h1 className='text-4xl sm:text-5xl font-bold mb-6'>
          Our <span className='bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text'>Blogs</span>
        </h1>
        <p className='max-w-[740px] m-auto text-sm sm:text-base text-gray-300'>
          Discover our latest insights and creative explorations in technology, design, and AI.
        </p>

        {/* Subscribe Form */}
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row justify-center items-center max-w-[500px] mx-auto mt-10 border border-purple-500 rounded-md overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.2)]'
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Enter your email'
            required
            className='px-4 py-3 w-full sm:w-auto flex-1 bg-[#1B1E36] text-white outline-none'
          />
          <button
            type='submit'
            className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

