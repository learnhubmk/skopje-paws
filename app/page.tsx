import Hero from "../components/Hero";
import Steps from "@/Steps/Steps";
import Services from "@/Services";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";


export default function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <Services />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
        </div>
    )
}
