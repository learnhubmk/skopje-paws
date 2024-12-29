"use client";
import {useRouter} from "next/navigation";
import {logout} from "../actions/dashboardActions";

export default function DashboardHeader() {
    const router = useRouter();
    const logoutUser = async () => {
        await logout(router);
    }
    return (
        <div className="flex w-full justify-end gap-5">
            <button onClick={() => router.push("/dashboard/blogs")}
                    className="text-xl px-3 py-1 bg-orange text-white rounded-lg">
                Блогови
            </button>
            <button onClick={() => router.push("/dashboard/reservations")}
                    className="text-xl px-3 py-1 bg-orange text-white rounded-lg">
                Резервации
            </button>
            <button onClick={() => router.push("/dashboard/employees")}
                    className="text-xl px-3 py-1 bg-orange text-white rounded-lg">
                Вработени
            </button>
            <button onClick={logoutUser} className="text-xl px-3 py-1 bg-red-500 text-white rounded-lg">
                Log Out
            </button>
        </div>
    );
}
