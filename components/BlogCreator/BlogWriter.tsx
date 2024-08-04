"use client"

import React, { FormEvent } from "react"
import RichText from "./RichText/RichText"
import { addBlog } from "../../actions/blogActions"

export default function BlogWriter() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const isConfirmed = window.confirm("Are you sure you want to submit the changes?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await addBlog(title, content);
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