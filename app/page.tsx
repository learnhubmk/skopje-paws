import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import FAQAccordion from "../components/FAQ/FAQAccordion";


export default function Home() {
    return (
        <div>
            <Hero />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
            <FAQAccordion />
        </div>
    )
}
