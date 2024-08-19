import BlogCard from "@/BlogCard/BlogCard";
import { retrieveBlogs } from "../../actions/blogActions";

type BlogProps = {
    limit?: number;
};

export default async function Blogs({ limit }: BlogProps) {
    const contentData = await retrieveBlogs(limit);

    if (!contentData.blog) {
        return <p className="text-black text-center text-3xl py-8">No Blogs found</p>;
    }

    const images = [
        "./BlogImg/blogImg1.svg",
        "./BlogImg/blogImg2.svg",
        "./BlogImg/blogImg3.svg",
    ];

    return (
        <div className="flex flex-row flex-wrap justify-center font-sans p-8 gap-8">
            {contentData.blog.map((blog, index) => {
                const createdAt = new Date(blog.createdAt);
                const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}.${(createdAt.getMonth() + 1).toString().padStart(2, '0')}.${createdAt.getFullYear()}`;

                const imagePath = images[index % images.length];

                return (
                    <BlogCard
                        key={blog.slugURL}
                        title={blog.title}
                        text={blog.content}
                        imageUrl={imagePath}
                        date={formattedDate}
                        slugURL={blog.slugURL}
                    />
                );
            })}
        </div>
    );

}
