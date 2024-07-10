import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import FAQ from "../components/FAQ/FAQ"


export default function Home() {
    return (
        <div>
            <Hero />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
            <FAQ />
        </div>
    )
}
