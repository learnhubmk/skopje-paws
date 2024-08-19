import Hero from "../components/Hero";
import Steps from "@/Steps/Steps";
import Carousel from "@/Carousel/Carousel";
import Services from "@/Services";
import Form from "@/Form";
import Blogs from "./blogs/page";

export default function Home() {

    return (
        <div>
            <Hero />
            <Steps />
            <Carousel />
            <Services />
            <Form />
            <Blogs limit={3} />
        </div>
    )
}