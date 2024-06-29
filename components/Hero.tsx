import TextImage from "./TextImage";
import HeroImage from "../public/hero.svg";

const Hero = () => {
    return (
        <div>
            <TextImage image={HeroImage} text={`Hero Section`}
                       style={`relative flex flex-col justify-between items-center px-12 h-full overflow-hidden w-full mt-10`}></TextImage>
            <div className="absolute top-1/3 text-start text-black " style={{ marginLeft: '78px' }}>
                <p className="text-5xl font-bold">Ние ќе го прошетаме</p>
                <p className="text-5xl">вашето милениче</p>
            </div>
        </div>

)
    ;
};

export default Hero;
