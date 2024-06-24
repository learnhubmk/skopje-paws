import Image from "next/image";
import footerLogo from "../public/footerLogo.svg";
import pawsFootprint from "../public/paws.svg";

const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center pb-20 pt-12">
            <div className="flex flex-col relative border-2 items-center justify-center rounded-3xl border-orange w-5/6 max-w-screen-xl p-4">
                <Image src={footerLogo} alt="Hero Image" className="mx-auto w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4" />
                <div className="flex flex-col items-center">
                    <a className="text-lg md:text-xl lg:text-2xl text-black mb-6" href="tel:077805229">077 805 229</a>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <Image src={pawsFootprint} alt="Paws Footprint 1" className="absolute bottom-1/4 left-1/4 -translate-x-16 lg:-translate-x-32 rotate-[-157deg] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                    <Image src={pawsFootprint} alt="Paws Footprint 2" className="absolute -top-4 left-1/4 rotate-[-135deg] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                    <Image src={pawsFootprint} alt="Paws Footprint 3" className="absolute -bottom-4 -translate-x-3/4 rotate-[-154.79deg] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                    <Image src={pawsFootprint} alt="Paws Footprint 4" className="absolute -top-2 right-1/4 translate-x-8 rotate-[163.6deg] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                    <Image src={pawsFootprint} alt="Paws Footprint 5" className="absolute bottom-4 right-1/4 translate-x-16 lg:translate-x-32 rotate-[-177.86deg] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                </div>

                <div className="flex flex-col justify-center gap-y-8 w-11/12 md:w-3/4 md:flex-row md:gap-0 py-2">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 md:justify-end md:pr-2 md:w-3/5 md:max-w-128">
                        <a href="#steps" className="w-60 h-10 bg-orange flex items-center justify-center rounded-md rotate-[-11deg] text-charcoal">
                            <p>Чекори за закажување</p>
                        </a>
                        <a href="#clients" className="w-44 h-10 bg-orange flex items-center justify-center rounded-md rotate-[3deg] text-charcoal">
                            <p>Наши клиенти</p>
                        </a>
                        <a href="#contact" className="w-32 h-10 bg-orange flex items-center justify-center rounded-md rotate-[13deg] text-charcoal">
                            <p>Контакт</p>
                        </a>
                        <a href="#services" className="w-24 h-10 bg-orange flex items-center justify-center rounded-md rotate-[-4deg] text-charcoal">
                            <p>Услуги</p>
                        </a>
                        <a href="#blog" className="w-20 h-10 bg-orange flex items-center justify-center rounded-md rotate-[2deg] text-charcoal">
                            <p>Блог</p>
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:justify-start md:pl-2 md:w-2/5">
                        <a href="https://www.instagram.com/skopjepaws/" target="_blank" className="w-32 h-10 border-2 border-orange flex items-center justify-center rounded-md rotate-[-4deg] text-charcoal">
                            <p>Instagram</p>
                        </a>
                        <a href="https://www.facebook.com/people/Skopje-Paws/61556801129482/" target="_blank" className="w-32 h-10 border-2 border-orange flex items-center justify-center rounded-md rotate-[6deg] text-charcoal">
                            <p>Facebook</p>
                        </a>
                        <a href="https://www.linkedin.com/company/skopje-paws/" target="_blank" className="w-32 h-10 border-2 border-orange flex items-center justify-center rounded-md rotate-[-1deg] text-charcoal">
                            <p>Linkedin</p>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;