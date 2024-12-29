"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ReservationModal from "@/Reservations/ReservationModal";
import ReservationsTable from "@/Reservations/ReservationsTable";

export default function Dashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showReservationModal, setShowReservationModal] = useState(false);

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
        <>
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setShowReservationModal(true)}
                        className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади термин
                </button>
            </div>
            {showReservationModal && <ReservationModal setShowReservationModal={setShowReservationModal}/>}
            {isAuthenticated && <ReservationsTable/>}
        </>
    );
}