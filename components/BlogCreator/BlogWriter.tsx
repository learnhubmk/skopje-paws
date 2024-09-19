"use client";

import React, { FormEvent, useRef } from "react";
import RichText from "./RichText/RichText";
import { addBlog } from "../../actions/blogActions";

const cyrillicToLatinMap: Record<string, string> = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ѓ': 'Gj', 'Е': 'E', 'Ж': 'Zh',
    'З': 'Z', 'Ѕ': 'Dz', 'И': 'I', 'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj', 'М': 'M',
    'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'Ќ': 'Kj',
    'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Џ': 'Dzh', 'Ш': 'Sh', 'а': 'a',
    'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ѓ': 'gj', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'ѕ': 'dz', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n',
    'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ќ': 'kj', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'џ': 'dzh', 'ш': 'sh'
};

function transliterateCyrillicToLatin(str: string): string {
    return str.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

interface BlogWriterProps {
    initialTitle?: string;
    initialThumbnail?: string;
    initialContent?: string;
}

export default function BlogWriter({ initialTitle = '', initialThumbnail = '', initialContent = '' }: BlogWriterProps) {
    const quillRef = useRef<{ getQuill: () => any } | null>(null);
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const file = formData.get("thumbnail") as File;
        const reader = new FileReader();

        const content = formData.get("content") as string;
        const quill = quillRef.current?.getQuill();
        const sanitizedText = quill.getText().trim();
        if (sanitizedText.length < 64) {
            alert("Содржината мора да е минимум 64 карактери");
            return;
        }

        const title = formData.get("title") as string;
        const transliteratedTitle = transliterateCyrillicToLatin(title);
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

        reader.onloadend = async () => {
            const thumbnail = (reader.result as string !== "data:application/octet-stream;base64,")
                ? (reader.result as string)
                : initialThumbnail;

            try {
                const currentSlug = window.location.pathname.split('/').filter(Boolean).pop();
                const response = await addBlog(slugURL, title, sanitizedText, thumbnail, content, currentSlug);
                if (response.status === 200) {
                    alert(response.message);
                    location.replace(`/blogs/${slugURL}`);
                } else {
                    alert(`Error ${response.status}: ` + response.message);
                }
            } catch (error) {
                alert(`Error: ` + `${error.message.split('.')[0]}.`);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        };
    }

    return (
        <form onSubmit={onSubmit} className="rounded-3xl px-4 md:px-12 xl:px-24 py-12 flex flex-col w-full h-full border-orange border-2 gap-8">
            <div className="flex gap-2 flex-col justify-center items-center">
                <input type="file" name="thumbnail" accept=".jpg, .jpeg, .png" required={!initialThumbnail} className="max-w-64 overflow-hidden" />
                <img src={initialThumbnail} className={`inset-0 max-w-full max-h-72 object-contain ${!initialThumbnail ? 'hidden' : ''}`} alt={initialTitle} />
            </div>
            <div className="flex flex-col lg:flex-row justify-between">
                <input
                    name="title"
                    type="text"
                    defaultValue={initialTitle}
                    className="rounded-xl p-4 w-full border placeholder-grey focus:outline-orange"
                    placeholder="Наслов"
                    required
                />
            </div>
            <RichText ref={quillRef} name="content" initialValue={initialContent} />
            <button type="submit" className="rounded-xl bg-orange p-4 w-full">
                Зачувај Блог
            </button>
        </form>
    );
}