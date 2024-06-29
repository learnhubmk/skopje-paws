import Image, {StaticImageData} from "next/image";

interface TextImageProps {
    image: StaticImageData;
    text: string;
    style?: string;
}

const TextImage = ({image, text, style}: TextImageProps) => {

    return (
        <div className={style}>
           <p className={`mb-4`}> {text} </p>
            <Image src={image} alt={`hero image`} className={`w-full`} priority/>
        </div>

    )
}
export default TextImage;