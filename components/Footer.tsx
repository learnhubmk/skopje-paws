import TextImage from "@/TextImage";
import img from "../public/favicon.jpg";

const Footer = () => {

    return <footer className={`mt-10 flex flex-col justify-between items-center h-full w-full bg-black text-white`}>
        Footer
        <div className={`text-orange`}>broj za contact: +389123456789</div>
        <TextImage image={img} text={"Placeholder"} style={`mt-10 flex flex-col justify-between items-center h-full w-full bg-black text-white`}/>
    </footer>
}
export default Footer;