"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { retrieveReservations, getReservationsFromYesterday } from "../../actions/reservationActions";
import ReservationModal from "@/Reservations/ReservationModal";
import ReservationsTable from "@/Reservations/ReservationsTable";
import DashboardHeader from "@/DashboardHeader";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeReservations, setActiveReservations] = useState([]);
    const [allReservations, setAllReservations] = useState([]);
    const router = useRouter();
    const [showReservationModal, setShowReservationModal] = useState(false);

    useEffect(() => {
        fetch("/api/auth/check")
            .then((response) => {
                if (response.ok) {
                    setIsAuthenticated(true);
                    fetchReservations();
                } else {
                    router.push("/login");
                }
            })
            .catch(() => router.push("/login"))
            .finally(() => setIsLoading(false));
    }, [router]);

    const fetchReservations = async () => {
        const { reservations: activeReservations, error: activeReservationsError } = await getReservationsFromYesterday();
        const { reservations: allReservations, error: allReservationsError } = await retrieveReservations();

        if (activeReservationsError || allReservationsError) {
            throw new Error(activeReservationsError || allReservationsError);
        }

        setActiveReservations(activeReservations);
        setAllReservations(allReservations);
    };

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>;

    return (
        <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
            <DashboardHeader />
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setShowReservationModal(true)} className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади термин
                </button>
            </div>
            {showReservationModal && <ReservationModal fetchReservations={fetchReservations} setShowReservationModal={setShowReservationModal} />}

            {isAuthenticated && <ReservationsTable fetchReservations={fetchReservations} activeReservations={activeReservations} allReservations={allReservations} />}
        </div>
    );
}