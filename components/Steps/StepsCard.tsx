import Image from "next/image";
interface CardProps {
    title: string;
    description: string;
    color?: string;
    image?: string;
}

const StepsCard = ({ title, description, color = "bg-cream", image }: CardProps) => {
    return (
        <div className={`w-auto w-80 h-80 sm:w-80 sm:h-80 xl:w-80 xl:h-80 lg:w-56 lg:h-56 rounded-4xl ${color} p-5 sm:p-7 lg:px-6 lg:py-5`}>
            <div className={`image w-10 h-10 sm:w-14 sm:h-14`}>
                <Image src={image} alt={title} width={100} height={100} />
            </div>
            <div className={`text-black text-2xl py-3 xl:text-xl lg:text-lg sm:text-2xl font-bold xl:pt-3 xl:pb-3 sm:pt-5 pb-2 sm:pb-4 lg:pt-1 lg:pb-1`}>{title}</div>
            <p className={`text-black xl:font-medium text-lg xl:text-base lg:text-sm sm:text-xl`}>
                {description}
            </p>
        </div>
    );
};

export default StepsCard;