"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
        }).then(async (response) => {
            if (response.ok) {
                router.push("/dashboard");
            }
        }).catch(error => window.alert(error))
    };

    useEffect(() => {
        fetch('/api/auth/check')
            .then(response => {
                if (response.ok) {
                    router.push("/dashboard");
                }
            })
            .catch(() => {
                router.push("/");
            });
    }, [router]);

    return (
        <div className="pt-12 w-screen flex flex-col justify-center items-center">
            <div
                className="flex flex-col p-4 gap-4 w-5/6 max-w-screen-sm border-2 border-black rounded-xl text-charcoal">
                <h1 className="font-bold text-4xl text-center p-2">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p>Username</p>
                        <input
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-8 px-1 border-[1px] border-black rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-1 pb-4">
                        <p>Password</p>
                        <input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="font-extrabold h-8 px-1 border-[1px] border-black rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-2xl py-2 px-2 border-2 border-black hover:bg-black hover:text-white rounded"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}