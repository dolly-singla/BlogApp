import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const BlogDate = date ? new Date(date) : null;

  return (
    <tr className='border-b border-gray-700 hover:bg-[#2a2e43] transition'>
      <th
        scope='row'
        className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-white whitespace-nowrap'
      >
        <Image
          width={40}
          height={40}
          src={authorImg ? authorImg : assets.profile_icon}
          alt='Author'
          className='rounded-full border border-gray-600'
        />
        <p className='ml-3'>{author || "No author"}</p>
      </th>
      <td className='px-6 py-4 text-white'>
        {title || "No title"}
      </td>
      <td className='px-6 py-4 text-white'>
        {BlogDate ? BlogDate.toDateString() : "No date"}
      </td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className='px-6 py-4 text-red-400 hover:text-red-500 font-bold cursor-pointer'
        title='Delete Blog'
      >
        ×
      </td>
    </tr>
  );
};

export default BlogTableItem;

