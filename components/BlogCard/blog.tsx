import React from "react";
import blogs from "./blogList";
import BlogCard from "./BlogCard";

const Blogs: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Блог</h1>
      <div className="flex flex-wrap justify-center">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            text={blog.text}
            imageUrl={blog.imageUrl}
            date={blog.time}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
