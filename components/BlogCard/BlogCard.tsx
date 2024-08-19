"use client"

import React from "react";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  text: string;
  imageUrl: string;
  date: string;
  slugURL: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, text, imageUrl, date, slugURL }) => {
  return (
    <div
      onClick={() => (window.location.href = `/blogs/${slugURL}`)}
      className="flex flex-col justify-between w-full max-w-xs lg:max-w-sm rounded-2xl overflow-hidden shadow-lg hover:cursor-pointer text-black"
    >
      <div className="relative w-full pb-[60%] rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="text-gray-600 text-xs md:text-sm pb-2">{date}</div>
        <div className="pb-1 font-bold text-lg md:text-xl">{title}</div>
        <article
          className="text-gray-700 text-sm h-20 md:h-24 overflow-y-hidden"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
