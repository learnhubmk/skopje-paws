import Steps from "@/Steps/Steps";
import Carousel from "@/Carousel/Carousel";
import Services from "@/Services";
import FAQ from "@/FAQ/FAQ";
import ContactForm from "@/ContactForm";
import Blogs from "./blogs/page";
import ReservationComponent from "@/Reservations/ReservationComponent";

export default function Home() {

    return (
        <div>
            <ReservationComponent />
            <Steps />
            <Carousel />
            <Services />
            <FAQ />
            <ContactForm />
            <Blogs limit={3} />
        </div>
    )
}