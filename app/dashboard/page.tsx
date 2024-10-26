"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
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
        fetch('/api/auth/check')
            .then(response => {
                if (!response.ok) {
                    router.push('/login');
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => {
                router.push('/login');
            });
    }, [router]);

    if (isLoading) return <div className="py-12 text-center text-charcoal">Loading...</div>

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
                            <tr className="border-b hover:bg-gray-200">
                                <td className="px-2 py-1 border">2024-10-26</td>
                                <td className="px-2 py-1 border">10:00</td>
                                <td className="px-2 py-1 border">30 Минути</td>
                                <td className="px-2 py-1 border">Андреј Петров</td>
                                <td className="px-2 py-1 border">andrej@example.com</td>
                                <td className="px-2 py-1 border">070 123 456</td>
                                <td className="px-2 py-1 border">Скопје</td>
                                <td className="px-2 py-1 border">Центар</td>
                                <td className="px-2 py-1 border">Авенија на Човековите Права и Слободите 25-А</td>
                                <td className="px-2 py-1 border">Златен ретривер</td>
                                <td className="px-2 py-1 border">Социјализација</td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-200">
                                <td className="px-2 py-1 border">2024-10-27</td>
                                <td className="px-2 py-1 border">15:30</td>
                                <td className="px-2 py-1 border">30 Минути</td>
                                <td className="px-2 py-1 border">Марија Николовска</td>
                                <td className="px-2 py-1 border">marija@example.com</td>
                                <td className="px-2 py-1 border">071 234 567</td>
                                <td className="px-2 py-1 border">Скопје</td>
                                <td className="px-2 py-1 border">Центар</td>
                                <td className="px-2 py-1 border">Булевар на Восстание и Единство 47</td>
                                <td className="px-2 py-1 border">Француски булдог</td>
                                <td className="px-2 py-1 border">Спорт</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-200">
                                <td className="px-2 py-1 border">2024-10-28</td>
                                <td className="px-2 py-1 border">18:00</td>
                                <td className="px-2 py-1 border">60 Минути</td>
                                <td className="px-2 py-1 border">Благој Јовановски</td>
                                <td className="px-2 py-1 border">blagoj@example.com</td>
                                <td className="px-2 py-1 border">078 345 678</td>
                                <td className="px-2 py-1 border">Скопје</td>
                                <td className="px-2 py-1 border">Карпош</td>
                                <td className="px-2 py-1 border">Улица на Младоста и Прогресивните Идеи 8,</td>
                                <td className="px-2 py-1 border">Германски овчар</td>
                                <td className="px-2 py-1 border">Социјализација</td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-200">
                                <td className="px-2 py-1 border">2024-10-29</td>
                                <td className="px-2 py-1 border">09:00</td>
                                <td className="px-2 py-1 border">60 Минути</td>
                                <td className="px-2 py-1 border">Елена Димитрова</td>
                                <td className="px-2 py-1 border">elena@example.com</td>
                                <td className="px-2 py-1 border">072 456 789</td>
                                <td className="px-2 py-1 border">Скопје</td>
                                <td className="px-2 py-1 border">Бутел</td>
                                <td className="px-2 py-1 border">Булевар на Надежта и Единството 73</td>
                                <td className="px-2 py-1 border">Пудлица</td>
                                <td className="px-2 py-1 border">Релакс</td>
                            </tr>
                            <tr className="hover:bg-gray-200">
                                <td className="px-2 py-1 border">2024-10-30</td>
                                <td className="px-2 py-1 border">11:45</td>
                                <td className="px-2 py-1 border">90 Минути</td>
                                <td className="px-2 py-1 border">Стефан Ангелов</td>
                                <td className="px-2 py-1 border">stefan@example.com</td>
                                <td className="px-2 py-1 border">075 567 890</td>
                                <td className="px-2 py-1 border">Скопје</td>
                                <td className="px-2 py-1 border">Центар</td>
                                <td className="px-2 py-1 border">Патека на Трајните Вредности и Пријателството 5-А, стан 5</td>
                                <td className="px-2 py-1 border">Бигл</td>
                                <td className="px-2 py-1 border">Спорт</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;