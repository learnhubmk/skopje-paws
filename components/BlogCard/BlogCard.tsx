import React from "react";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  text: string;
  imageUrl: string;
  time: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, text, imageUrl, time }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image
          className="absolute inset-0 w-full h-full"
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="px-6 py-4">
          <div className="text-gray-500 text-sm">{time}</div>
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-xl text-gray-900">{title}</div>
        </div>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
    </div>
  );
};

export default BlogCard;
