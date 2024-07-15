import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import Steps from "@/Steps/Steps";
import Blogs from "@/BlogCard/blog";
import FAQ from "../components/FAQ/FAQ"


export default function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
            <FAQ />
            <Blogs/>
        </div>
    )
}