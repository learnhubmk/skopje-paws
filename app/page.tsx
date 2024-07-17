import Hero from "../components/Hero";
import Steps from "@/Steps/Steps";
import Services from "@/Services";
import Form from "@/Form";
import Blogs from "@/BlogCard/blog";
import Carousel from "@/Carousel/Carousel";


export default function Home() {

    return (
        <div>
            <Hero />
            <Steps />
            <Carousel />
            <Services />
            <Form />
            <Blogs />
        </div>
    )
}