import Image from "next/image";
import LOGO from "../public/logo.png"
import LinkButton from "@/LinkButton";

const Navigation = () => {
    return (
        <nav className={`flex justify-between h-full w-full bg-white overflow-hidden mt-10 pl-24 pr-24`}>
            <div className={`flex-initial w-full`}>
                <Image src={LOGO} alt={`Skopje Paws Logo`} className={"flex items-start"} />
            </div>
            <div className={"flex items-center justify-between list-none w-full"}>
                <li><LinkButton type={"link"} url={"/contact#steps"} text={"Чекори за закажување"} bgColor={"bg-white"} textColor={"text-black"}/></li>
                <li><LinkButton type={"link"} url={"#services"} text={"Услуги"} bgColor={"bg-white"} textColor={"text-black"}/></li>
                <li><LinkButton type={"link"} url={"#clients"} text={"Наши Клиенти"} bgColor={"bg-white"} textColor={"text-black"}/></li>
                <li><LinkButton type={"link"} url={"#contact"} text={"Контакт"} bgColor={"bg-white"} textColor={"text-black"}/></li>
                <li><LinkButton type={"link"} url={"/contact"} text={"Закажи термин"} bgColor={"bg-orange"} textColor={"text-black"}/></li>
            </div>
        </nav>
    );
};

export default Navigation;
