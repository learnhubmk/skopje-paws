"use client";
import Blogs from "@/blogs/page";
import {useRouter} from "next/navigation";

export default function BlogsWithButton() {
    const router = useRouter();
    return <>
        <div className="flex justify-start w-full">
            <button onClick={() => router.push("/dashboard/blogs/add")}
                    className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                + Додади Блог
            </button>
        </div>
        <Blogs/>
    </>
}