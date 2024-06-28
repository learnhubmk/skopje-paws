import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import FAQDropDown from "../components/FAQ/FAQDropdown";


export default function Home() {
    return (
        <div>
            <Hero/>
            <GalleryPage folderName={`Showcase`}/>
            <GalleryPage folderName={`Services`}/>
            <Form/>
            <FAQDropDown />
        </div>
    )
}
