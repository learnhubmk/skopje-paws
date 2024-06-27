import Image from "next/image";
import img from "../public/footerLogo.svg";
import paws from "../public/paws.svg";

const Footer = () => {

    return (
        <footer className="w-full flex items-center justify-center pb-[76px] pt-[50px]">
            <div className="flex flex-col items-center relative border-2 rounded-[25px] border-[#FFAC66] w-[1240px] h-[281px]">
                <Image src={img} alt={"Hero Image"} width={104} height={84} className="absolute top-[30px]" />
                <p className="absolute top-[122px] text-[17.33px] text-black">077 805 229</p>

                <Image src={paws} alt={"Paws 1"} width={78.74} height={78.74} className="absolute top-[113px] left-[81px] rotate-[-157deg]"></Image>
                <Image src={paws} alt={"Paws 2"} width={78.74} height={78.74} className="absolute top-[-22px] left-[261px] rotate-[-134.91deg]"></Image>
                <Image src={paws} alt={"Paws 3"} width={78.74} height={78.74} className="absolute bottom-[-20px] left-[538px] rotate-[-154.79deg]"></Image>
                <Image src={paws} alt={"Paws 4"} width={78.74} height={78.74} className="absolute top-[-12px] right-[251px] rotate-[163.6deg]" />
                <Image src={paws} alt={"Paws 5"} width={78.74} height={78.74} className="absolute top-[179px] right-[80px] rotate-[-177.86deg]"></Image>

                <a href="#blog" className="absolute bottom-[15px] left-[559px] w-[82px] h-[40px] bg-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[2deg] text-[#2C2C2C]">
                    <p>Блог</p>
                </a>
                <a href="#clients" className="absolute bottom-[62px] left-[440px] w-[174px] h-[40px] bg-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[3deg] text-[#2C2C2C]">
                    <p>Наши клиенти</p>
                </a>
                <a href="#contact" className="absolute bottom-[50px] right-[485px] w-[128px] h-[40px] bg-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[13deg] text-[#2C2C2C]">
                    <p>Контакт</p>
                </a>
                <a href="#services" className="absolute bottom-[17px] left-[367px] w-[103px] h-[40px] bg-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[-4deg] text-[#2C2C2C]">
                    <p>Услуги</p>
                </a>
                <a href="#steps" className="absolute bottom-[47px] left-[197px] w-[240px] h-[40px] bg-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[-16deg] text-[#2C2C2C]">
                    <p>Чекори за закажување</p>
                </a>
                <a href="https://www.instagram.com/skopjepaws/" target="_blank" className="absolute bottom-[18px] right-[347px] w-[130px] h-[40px] border-2 border-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[-4deg] text-[#2C2C2C]">
                    <p>Instagram</p>
                </a>
                <a href="https://www.facebook.com/people/Skopje-Paws/61556801129482/" target="_blank" className="absolute bottom-[62px] right-[263px] w-[122px] h-[40px] border-2 border-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[6deg] text-[#2C2C2C]">
                    <p>Facebook</p>
                </a>
                <a href="https://www.linkedin.com/company/skopje-paws/" target="_blank" className="absolute bottom-[12px] right-[203px] w-[112px] h-[40px] border-2 border-[#FFAC66] flex items-center justify-center rounded-[10px] rotate-[-1deg] text-[#2C2C2C]">
                    <p>Linkedin</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer;