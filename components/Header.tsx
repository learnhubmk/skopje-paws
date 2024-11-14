import Image from "next/image";
import Logo from "../public/logo.svg"
import LinkButton from "@/LinkButton";

export default function Header() {
    return (
        <nav className="flex justify-between items-center h-full w-full overflow-hidden py-8 px-16">
            <div>
                <div>
                    <Image src={Logo} alt="Logo"></Image>
                </div>
            </div>
            <div className={"flex items-center justify-between list-none w-full"}>
                <li><LinkButton type={"link"} url={"/contact#steps"} text={"Чекори за закажување"} bgColor={"bg-white"} textColor={"text-black"} /></li>
                <li><LinkButton type={"link"} url={"#services"} text={"Услуги"} bgColor={"bg-white"} textColor={"text-black"} /></li>
                <li><LinkButton type={"link"} url={"#clients"} text={"Наши Клиенти"} bgColor={"bg-white"} textColor={"text-black"} /></li>
                <li><LinkButton type={"link"} url={"#contact"} text={"Контакт"} bgColor={"bg-white"} textColor={"text-black"} /></li>
                <li><LinkButton type={"link"} url={"/contact"} text={"Закажи термин"} bgColor={"bg-orange"} textColor={"text-black"} /></li>
            </div>
        </nav>
    );
};