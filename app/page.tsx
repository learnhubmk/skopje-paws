import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import Blog from "@/BlogCard/blog";

export default function Home() {
  return (
    <div>
      <Hero />
      <GalleryPage folderName={`Showcase`} />
      <GalleryPage folderName={`Services`} />
      <Form />
      <Blog/>
    </div>
  );
}
