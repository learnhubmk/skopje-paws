import Hero from "../components/Hero";
import Steps from "@/Steps/Steps";
import Services from "@/Services";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import Blogs from "@/BlogCard/blog";


export default function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <Services />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
            <Blogs/>
        </div>
    )
}