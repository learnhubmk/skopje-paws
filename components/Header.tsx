"use client"

import Image from "next/image";
import Logo from "../public/logo.svg"
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="w-full top-0 left-0 right-0 z-10 text-black">
            <div className="justify-between px-4 mx-auto lg:max-w-screen-xl lg:items-center lg:flex lg:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
                        <Link href={"/"} className="p-2">
                            <Image src={Logo} alt="Logo"></Image>
                        </Link>

                        <div className="lg:hidden">
                            <button
                                className="p-2 rounded-md outline-none border-black border"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                {showMenu ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex-1 text-2xl lg:text-sm xl:text-2xl justify-center lg:block lg:pb-0 lg:mt-0 ${showMenu ? "py-12 lg:p-0 block" : "hidden"}`}>
                        <ul className="h-screen lg:h-auto items-center justify-center lg:flex gap-4 lg:gap-8">
                            <li className="py-6 lg:py-0 px-6 lg:px-0 text-center border-b-2 lg:border-b-0">
                                <Link href={"/#steps"} onClick={() => setShowMenu(false)}>
                                    Чекори за закажување
                                </Link>
                            </li>
                            <li className="py-6 lg:py-0 px-6 lg:px-0 text-center border-b-2 lg:border-b-0">
                                <Link href={"/#services"} onClick={() => setShowMenu(false)}>Услуги</Link>
                            </li>
                            <li className="py-6 lg:py-0 px-6 lg:px-0 text-center border-b-2 lg:border-b-0">
                                <Link href={"/#clients"} onClick={() => setShowMenu(false)}>Наши клиенти</Link>
                            </li>
                            <li className="py-6 lg:py-0 px-6 lg:px-0 text-center border-b-2 lg:border-b-0">
                                <Link href={"/#contact"} onClick={() => setShowMenu(false)}>Контакт</Link>
                            </li>
                            <li className="py-6 lg:py-0 px-6 lg:px-0 text-center">
                                <Link href={"/#reservation"} className="bg-orange px-4 py-1 rounded" onClick={() => setShowMenu(false)}>Закажи термин</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}