"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservationsFromYesterday } from "../../actions/reservationActions";
import CreateReservation from "@/Reservations/CreateReservationModal";
import ReactTable from "@/Reservations/ReservationsTable";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const router = useRouter();
    const [isShowing, setIsShowing] = useState(false);

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
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/check");
                if (!response.ok) {
                    router.push("/login");
                } else {
                    await fetchReservations();
                    setIsLoading(false);
                }
            } catch {
                router.push("/login");
            }
        };

        checkAuth();
    }, [router]);

    const fetchReservations = async () => {
        try {
            const { reservations, error } = await getReservationsFromYesterday();

            if (error) {
                throw new Error(error);
            }

            setReservations(reservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>;

    return (
        <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setIsShowing(true)} className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади термин
                </button>
                <button onClick={logout} className="text-xl px-3 py-1 bg-red-500 text-white rounded-lg">
                    Log Out
                </button>
            </div>
            {isShowing && <CreateReservation setIsShowing={setIsShowing} />}

            <ReactTable reservations={reservations} />
        </div>
    );
}