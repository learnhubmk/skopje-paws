"use client";

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (response.ok) {
                router.push("/");
            } else {
                console.error("Failed to log out");
            }
        } catch {
            console.error("Something went wrong during logout");
        }
    };

    return (

        <div className="flex w-full justify-start">
            <button onClick={logout} className="text-xl px-3 py-1 bg-red-500 text-white rounded-lg">
                Log Out
            </button>
        </div >
    );
}
