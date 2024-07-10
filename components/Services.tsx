import Image from "next/image";
import dogWalking from "../public/Services Images/dogWalking.jpg"
import dogSitting from "../public/Services Images/dogSitting.jpg"

export default function Services() {
    return (
        <div className="flex flex-col justify-center items-center w-full pt-12 pb-3 gap-8 px-4 lg:px-20">
            <p className="text-charcoal text-4xl sm:text-5xl font-bold text-center">Наши услуги</p>
            <div className="flex flex-col xl:flex-row justify-center items-center gap-8">

                <div className="relative w-full h-auto min-w-[312px] sm:w-[454px] sm:h-[310px] md:w-[506px] md:h-[344px] border-4 rounded-[25px] border-orange">
                    <Image src={dogWalking} alt="A person walking a dog" className="w-full h-auto sm:w-auto sm:h-full rounded-[21px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/50 to-[#343434]/0 rounded-[21px]"></div>
                    <div className="absolute inset-0 flex flex-col items-center pt-8 gap-4">
                        <p className="font-bold text-3xl sm:text-5xl text-center p-2">Прошетки на кучиња</p>
                        <a href="#steps" className="text-lg px-4 py-2 bg-orange text-charcoal rounded-[10px]">Закажи термин</a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative h-auto w-[234px] sm:w-[351px] sm:h-[344px] border-4 rounded-[25px] border-orange">
                        <Image src={dogSitting} alt="A person petting a dog" className="w-full h-auto sm:w-auto sm:h-full rounded-[21px]" />
                        <div className="absolute inset-0 bg-[#090909]/50 rounded-[21px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center gap-4">
                            <p className="font-bold text-3xl sm:text-5xl text-orange">Наскоро</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-around text-left max-w-80 gap-4">
                        <p className="text-orange text-3xl font-bold">Домашни посети (Pet sitting)</p>
                        <p className="text-charcoal text-xl">Наскоро услугата домашни посети. Доколку сте на работа или на одмор, ние сме тука да внимаваме на вашите миленици преку денот и да ги шетаме.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};