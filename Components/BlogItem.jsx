import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="bg-[#1B1E36] text-white rounded-xl overflow-hidden max-w-xs sm:max-w-sm shadow-lg border border-[#2A2D48] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_10px_#6c5ce7]">
      {/* Image */}
      <Link href={`/blogs/${id}`}>
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block mb-2 text-xs uppercase tracking-wide text-pink-400 bg-[#2A2D48] px-3 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p
          className="text-sm text-gray-300 line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        />
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center text-sm text-blue-400 hover:underline"
        >
          Read more
          <Image
            src={assets.arrow}
            className="ml-2"
            width={18}
            height={10}
            alt="Arrow"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
