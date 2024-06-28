interface LinkButtonProps {
    type: "link" | "button";
    url: string;
    text: string;
    callback?: () => void;
    bgColor: "bg-white" | "bg-orange" | "bg-cream"
    textColor: "text-white" | "text-black" | "text-orange" | "text-cream"
}

const LinkButton = ({ type, url, text, callback, bgColor, textColor }: LinkButtonProps) => {

    return type === "link" ? <a href={url} className={`${bgColor} ${textColor} rounded-lg p-3`}>{text}</a> : <button />
}

export default LinkButton;