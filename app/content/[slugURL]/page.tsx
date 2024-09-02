import React from "react";
import BlogWriter from "@/BlogCreator/BlogWriter";
import { selectBlog } from "../../../actions/blogActions";

export default async function BlogWriterPage({ params }: { params: { slugURL: string } }) {
    const { slugURL } = params;
    const contentData = await selectBlog(slugURL);

    if (!contentData.blog) {
        return <div className="text-black text-5xl py-20 px-2">Blog not found</div>;
    }

    return (
        <div className="flex flex-col w-screen px-2 md:px-12 xl:px-24 py-12 text-black text-center font-sans">
            <h1 className="font-bold text-5xl p-4">Блог</h1>
            <BlogWriter
                initialTitle={contentData.blog.title}
                initialThumbnail={contentData.blog.thumbnail}
                initialContent={contentData.blog.content}
            />
        </div>
    );
}
