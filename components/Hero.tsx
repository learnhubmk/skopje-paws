import TextImage from "./TextImage";
import HeroImage from "../public/favicon.jpg";

const Hero = () => {
    return (
        <TextImage image={HeroImage} text={`Hero Section`} style={`flex flex-col justify-between items-center h-full overflow-hidden w-full mt-10`}></TextImage>
    );
};

export default Hero;
