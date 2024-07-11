import Hero from "../components/Hero";
import Form from "@/Form";
import Steps from "@/Steps/Steps";
import Blogs from "@/BlogCard/blog";
import ReactCalendar from "@/Calendar/ReactCalendar";


export default function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <ReactCalendar />
            <Form />
            <Blogs />
        </div>
    )
}