'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setBlogs([]);
    }
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: { id: mongoId }
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-10 px-5 sm:pt-16 sm:px-16 bg-[#0d0f1b] min-h-screen text-white'>
      <h1 className='text-3xl font-semibold gradient-text mb-6'>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-auto mt-4 border border-gray-600 rounded-md scrollbar-hide'>
        <table className='w-full text-sm text-white'>
          <thead className='text-sm text-gray-300 uppercase bg-[#1a1d2d]'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.image}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
