'use client';

import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs || response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(item =>
    menu === "All"
      ? true
      : item.category?.trim().toLowerCase() === menu.trim().toLowerCase()
  );

  return (
    <div className="bg-[#0F1123] text-white py-16 px-4 sm:px-10">
      <div className='flex justify-center flex-wrap gap-4 mb-10'>
        {["All", "AI", "ML", "Data Science"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              menu === cat
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item, index) => (
            <BlogItem
              key={index}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">No blogs found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
