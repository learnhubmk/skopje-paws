import RichText from "./RichText/RichText"

export default function BlogWriter() {
    return (
        <form className="rounded-3xl px-4 md:px-12 xl:px-24 py-12 flex flex-col w-full h-full border-orange border-2 gap-8">
            <div className="flex flex-col lg:flex-row justify-between">
                <input
                    type="text"
                    className="rounded-xl p-4 w-full border placeholder-grey focus:outline-orange"
                    placeholder="Наслов"
                    required
                />
            </div>
            <RichText />
            <button type="submit" className="rounded-xl bg-orange p-4 w-full">
                Зачувај Блог
            </button>
        </form>
    )
}