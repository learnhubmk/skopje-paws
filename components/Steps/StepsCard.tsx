interface CardProps {
    title: string;
    description: string;
    color?: string;
    image?: React.ReactNode;
}

const StepsCard = ({ title, description, color, image }: CardProps) => {
    return (
        <div className={`w-80 h-80 sm:w-80 sm:h-80 xl:w-80 xl:h-80 lg:w-56 lg:h-56 sm:w-40 sm:h-40 rounded-4xl bg-${color} p-5 sm:p-7 lg:px-6 lg:py-5`}>
            <div className={`w-10 h-10 sm:w-14 sm:h-14`}>{image}</div>
            <div className={`text-black text-2xl py-3 xl:text-xl lg:text-lg sm:text-2xl font-bold xl:pt-3 xl:pb-3 sm:pt-5 pb-2 sm:pb-4 lg:pt-1 lg:pb-1`}>{title}</div>
            <p className={`text-black xl:font-medium text-lg xl:text-base lg:text-sm sm:text-xl`}>
                {description}
            </p>
        </div>
    );
};

export default StepsCard;