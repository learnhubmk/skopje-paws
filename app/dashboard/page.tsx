"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const logout = async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });

        if (response.ok) {
            router.push("/");
        } else {
            console.error("Something went wrong during logout");
        }
    };

    useEffect(() => {
        fetch('/api/auth/check')
            .then(response => {
                if (!response.ok) {
                    router.push('/login');
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => {
                router.push('/login');
            });
    }, [router]);

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>

    return (
        <div className="flex flex-col justify-center items-center py-12 gap-4">
            <h1 className="text-center text-charcoal">
                Welcome to the Dashboard!
            </h1>
            <button onClick={logout} className="text-xl px-4 py-2 bg-red-500 text-white rounded-lg">
                Log Out
            </button>
        </div>
    );
};

export default Dashboard;