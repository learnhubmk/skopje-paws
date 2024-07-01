import Hero from "../components/Hero";
import GalleryPage from "../components/Gallery";
import Form from "@/Form";
import Steps from "@/Steps/Steps";
import EmblaCarousel from "@/Carousel/Carousel";
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <GalleryPage folderName={`Showcase`} />
            <GalleryPage folderName={`Services`} />
            <Form />
        </div>
    )
}
