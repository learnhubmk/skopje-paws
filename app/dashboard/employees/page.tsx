"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeTable from "@/Employees/EmployeeTable";
import DashboardHeader from "@/DashboardHeader";

export default function EmployeesDashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch("/api/auth/check")
            .then((response) => {
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/login");
                }
            })
            .catch(() => router.push("/login"))
            .finally(() => setIsLoading(false));
    }, [router]);

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>;

    return (
        <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
            <DashboardHeader />
            <EmployeeTable />
        </div>
    );
}