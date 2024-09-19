import Hero from "../components/Hero";
import Steps from "@/Steps/Steps";
import Carousel from "@/Carousel/Carousel";
import Services from "@/Services";
import Form from "@/Form";
import Blogs from "./blogs/page";
import ReactCalendar from "@/Calendar/ReactCalendar";

export default function Home() {

    return (
        <div>
            <Hero />
            <ReactCalendar />
            <Steps />
            <Carousel />
            <Services />
            <Form />
            <Blogs limit={3} />
        </div>
    )
}