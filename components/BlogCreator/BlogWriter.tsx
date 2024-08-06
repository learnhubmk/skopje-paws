"use client"

import React, { FormEvent } from "react"
import RichText from "./RichText/RichText"
import { addBlog } from "../../actions/blogActions"

const cyrillicToLatinMap = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ѓ': 'Gj', 'Е': 'E', 'Ж': 'Zh',
    'З': 'Z', 'Ѕ': 'Dz', 'И': 'I', 'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj', 'М': 'M',
    'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'Ќ': 'Kj',
    'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Џ': 'Dzh', 'Ш': 'Sh', 'а': 'a',
    'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ѓ': 'gj', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'ѕ': 'dz', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n',
    'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ќ': 'kj', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'џ': 'dzh', 'ш': 'sh'
};

function transliterateCyrillicToLatin(str) {
    return str.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

export default function BlogWriter() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const transliteratedTitle = transliterateCyrillicToLatin(title);
        const content = formData.get("content") as string;
        const slugURL = transliteratedTitle.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text

        const isConfirmed = window.confirm("Are you sure you want to submit the changes?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await addBlog(title, content, slugURL);
            if (response.status === 200) {
                alert(response.message);
                location.replace("/");
            } else {
                alert(`Error ${response.status}: ` + response.message);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <form onSubmit={onSubmit} className="rounded-3xl px-4 md:px-12 xl:px-24 py-12 flex flex-col w-full h-full border-orange border-2 gap-8">
            <div className="flex flex-col lg:flex-row justify-between">
                <input
                    name="title"
                    type="text"
                    className="rounded-xl p-4 w-full border placeholder-grey focus:outline-orange"
                    placeholder="Наслов"
                    required
                />
            </div>
            <RichText name="content" />
            <button type="submit" className="rounded-xl bg-orange p-4 w-full">
                Зачувај Блог
            </button>
        </form>
    )
}