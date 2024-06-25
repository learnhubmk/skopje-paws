import React from "react";
import BlogCard from "./BlogCard";


const blogs = [
  {
    title: "Зошто моето куче јаде трева?",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum error illum temporibus quis ducimus.",
    imageUrl: "./BlogImg/blogImg3.svg",
    time: "26.6.2024",
  },

  {
    title: "Зошто моето куче го копа креветчето?",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum error illum temporibus quis ducimus.",
    imageUrl: "./BlogImg/blogImg1.svg",
    time: "26.6.2024",
  },

  {
    title: "Фази на развој кај мали кутриња?",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum error illum temporibus quis ducimus.",
    imageUrl: "./BlogImg/blogImg2.svg",
    time: "26.6.2024",
  },
];

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
            time={blog.time}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
