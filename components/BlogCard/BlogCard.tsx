"use client"

import React from "react";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  text: string;
  date: string;
  thumbnail: string;
  slugURL: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, text, date, thumbnail, slugURL }) => {
  return (
    <div
      onClick={() => (window.location.href = `/blogs/${slugURL}`)}
      className="flex flex-col justify-between w-full max-w-72 lg:max-w-sm rounded-2xl overflow-hidden shadow-lg hover:cursor-pointer text-black"
    >
      <div className="relative w-full pb-[60%] rounded-2xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="text-gray-600 text-xs md:text-sm pb-2">{date}</div>
        <div className="pb-1 font-bold text-lg md:text-xl truncate">{title}</div>
        <div className="text-gray-700 line-clamp-3 h-[4.5rem]">{text}</div>
      </div>
    </div>
  );
};

export default BlogCard;
