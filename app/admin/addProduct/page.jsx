'use client'
import React, { useState } from 'react'
import { assets } from "@/Assets/assets";
import Image from 'next/image'
import axios from 'axios';
import { toast } from 'react-toastify';

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "ML",
    author: "Alex Bennet",
    authorImg: "/author_img.png"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    console.log({ ...data, [name]: value });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image);
    const response = await axios.post('/api/blog', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "ML",
        author: "Alex Bennet",
        authorImg: "/author_img.png"
      })
    } else {
      toast.error("Error")
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-10 px-5 sm:pt-16 sm:px-16 bg-[#0d0f1b] min-h-screen text-white">
        <h2 className="text-3xl font-semibold mb-6 gradient-text">Add New Blog</h2>

        <p className='text-lg font-medium mb-2'>Upload Thumbnail</p>
        <label htmlFor="image">
          <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} width={200} height={100} alt='' className='rounded-md border border-gray-500 cursor-pointer' />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

        <p className='text-lg font-medium mt-6 mb-2'>Blog Title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] px-4 py-3 rounded-md border border-gray-600 bg-[#1a1d2d] text-white' type="text" placeholder='Type here' required />

        <p className='text-lg font-medium mt-6 mb-2'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] px-4 py-3 rounded-md border border-gray-600 bg-[#1a1d2d] text-white' placeholder='Write content here' rows={6} required />

        <p className='text-lg font-medium mt-6 mb-2'>Blog Category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 px-4 py-3 border border-gray-600 bg-[#1a1d2d] text-white rounded-md'>
          <option value="ML">ML</option>
          <option value="AI">AI</option>
          <option value="Data Science">Data Science</option>
        </select>

        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md hover:opacity-90 transition duration-200'>ADD</button>
      </form>
    </>
  )
}

export default page
