"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import EmployeeTable from "@/Employees/EmployeeTable"


export default function EmployeesDashboard() {
    // return <div>debug div</div>;
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    //todo: migrate out to sub-header for dashboard navigation
    const logout = async () => {
        fetch("/api/auth/logout", {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    router.push("/");
                } else {
                    console.error("Failed to log out");
                }
            })
            .catch(() => {
                console.error("Something went wrong during logout");
            });
    };

    useEffect(() => {
        fetch("/api/auth/check")
            .then(async response => {
                if (!response.ok) {
                    router.push("/login");
                } else {
                    // await fetchReservations();
                    setIsLoading(false);
                }
            })
            .catch(() => {
                // router.push("/login");
            });
    }, [router]);


    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>;

    return (
        <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setShowEmployeeModal(true)}
                        className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади вработен
                </button>
                <button onClick={logout} className="text-xl px-3 py-1 bg-red-500 text-white rounded-lg">
                    Log Out
                </button>
            </div>
            {/*{showEmployeeModal &&*/}
            {/*    <EmployeeModal fetchReservations={fetchEmployees} setShowReservationModal={setShowEmployeeModal}/>}*/}

            <EmployeeTable/>
        </div>
    );
}