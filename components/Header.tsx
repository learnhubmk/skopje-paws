import Image from "next/image";
import Logo from "../public/logo.svg"
import Link from "next/link";

export default function Header() {
    return (
        <nav className="flex justify-between items-center h-full w-full overflow-hidden py-8 px-16">
            <Link href={"/"} className="p-2">
                <Image src={Logo} alt="Logo"></Image>
            </Link>
            <div className="flex items-center justify-center gap-8 text-black">
                <Link href={"/#steps"}>Чекори за закажување</Link>
                <Link href={"/#services"}>Услуги</Link>
                <Link href={"/#clients"}>Наши клиенти</Link>
                <Link href={"/#contact"}>Контакт</Link>
                <Link href={"/#hero"} className="bg-orange px-4 py-1 rounded">Закажи термин</Link>
            </div>
        </nav>
    );
};