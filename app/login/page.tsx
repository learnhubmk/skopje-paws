"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            router.push("/dashboard");
        } else {
            const errorData = await response.json();
            setError(errorData.error || "Something went wrong");
        }
    };

    useEffect(() => {
        fetch('/api/auth/check')
            .then(response => {
                if (response.ok) {
                    router.push("/dashboard");
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => {
                router.push("/");
            });
    }, [router]);

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>

    return (
        <div className="pt-12 w-screen flex flex-col justify-center items-center">
            <div className="flex flex-col p-4 gap-4 w-5/6 max-w-screen-sm border-2 border-black rounded-xl text-charcoal">
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
                        {error && <p className="text-red-500">{error}</p>}
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