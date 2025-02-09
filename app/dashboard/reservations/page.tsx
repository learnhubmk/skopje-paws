"use client";

import {useState} from "react";
import ReservationModal from "@/Reservations/ReservationModal";
import ReservationsTable from "@/Reservations/ReservationsTable";

export default function Dashboard() {
    const [showReservationModal, setShowReservationModal] = useState(false);
    return (
        <>
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setShowReservationModal(true)}
                        className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади термин
                </button>
            </div>
            {showReservationModal && <ReservationModal setShowReservationModal={setShowReservationModal}/>}
            <ReservationsTable/>
        </>
    );
}