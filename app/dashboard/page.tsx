"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservationsFromYesterday } from "../../actions/reservationActions";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
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
        <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4">
            <div className="flex flex-col w-full items-end">
                <button onClick={logout} className="text-xl px-3 py-1 bg-red-500 text-white rounded-lg">
                    Log Out
                </button>
            </div>
            <div className="flex flex-col w-full text-charcoal">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg text-charcoal text-center">
                        <thead>
                            <tr className="text-black">
                                <th className="px-4 py-2 border-2 border-black">Датум</th>
                                <th className="px-4 py-2 border-2 border-black">Време</th>
                                <th className="px-4 py-2 border-2 border-black">Времетраење на прошетка</th>
                                <th className="px-4 py-2 border-2 border-black">Име и презиме</th>
                                <th className="px-4 py-2 border-2 border-black">Е-пошта</th>
                                <th className="px-4 py-2 border-2 border-black">Телефонски број</th>
                                <th className="px-4 py-2 border-2 border-black">Град</th>
                                <th className="px-4 py-2 border-2 border-black">Општина</th>
                                <th className="px-4 py-2 border-2 border-black">Адреса</th>
                                <th className="px-4 py-2 border-2 border-black">Раса на куче</th>
                                <th className="px-4 py-2 border-2 border-black">Тип на прошетка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.length > 0 ? (
                                reservations.map((reservation, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-200">
                                        <td className="px-2 py-1 border border-black">{reservation.date}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.time}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.walkDuration} Минути</td>
                                        <td className="px-2 py-1 border border-black">{reservation.name}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.email}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.phoneNumber}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.city.charAt(0).toUpperCase() + reservation.city.slice(1)}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.municipality.charAt(0).toUpperCase() + reservation.municipality.slice(1)}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.address}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.dogBreed}</td>
                                        <td className="px-2 py-1 border border-black">{reservation.walkType.charAt(0).toUpperCase() + reservation.walkType.slice(1)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="px-2 py-1 border text-black">Нема резервации од вчера натаму</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}