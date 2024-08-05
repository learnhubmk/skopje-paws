import React from "react";
import BlogWriter from "@/BlogCreator/BlogWriter";

const BlogWriterPage = () => {
    return (
        <div className="flex flex-col w-screen px-2 md:px-12 xl:px-24 py-12 text-black text-center">
            <h1 className="font-bold text-5xl p-4">Блог</h1>
            <BlogWriter />
        </div>
    );
};

export default BlogWriterPage;