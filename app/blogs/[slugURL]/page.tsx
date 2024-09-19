import "quill/dist/quill.snow.css";
import { selectBlog } from "../../../actions/blogActions";

export default async function SlugBlog({ params }: { params: { slugURL: string } }) {
    const { slugURL } = params;
    const contentData = await selectBlog(slugURL);

    if (!contentData.blog) {
        return <div className="text-black text-5xl py-20 px-2">Blog not found</div>;
    }

    const createdAt = new Date(contentData.blog.createdAt);
    const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}.${(createdAt.getMonth() + 1).toString().padStart(2, '0')}.${createdAt.getFullYear()}`;

    return (
        <div className="w-screen px-4 md:px-8 lg:px-12 xl:px-20 py-8 md:pb-16 xl:pb-20 text-black font-sans">
            <img src={contentData.blog.thumbnail} className="mx-auto items-center p-4 max-w-full max-h-96 object-contain" alt={contentData.blog.title} />
            <p className="text-sm md:text-base text-right opacity-70 underline pb-4">
                Објавено на {formattedDate}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold pb-2 text-center">{contentData.blog.title}</h1>

            <div className="w-full h-1 bg-black" />

            <div className="ql-editor">
                <article dangerouslySetInnerHTML={{ __html: contentData.blog.content }} />
            </div>
        </div>
    )
};
