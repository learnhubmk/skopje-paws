"use client";
import DashboardHeader from "@/DashboardHeader";
import React, {Suspense, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch("/api/auth/check")
            .then((response) => {
                if (!response.ok) {
                    router.push("/login");
                }
            })
            .catch(() => router.push("/login"))
            .finally(() => setIsLoading(false));
    }, [router]);
    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>;
    return <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
        <DashboardHeader/>
        <Suspense>{children}</Suspense>
    </div>
}