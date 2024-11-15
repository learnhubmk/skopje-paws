import { useState } from "react";
import { addReservation } from "../../actions/calendarActions";

export default function ReservationModal({ fetchReservations, setShowReservationModal }) {
    const [formData, setFormData] = useState({
        reservationTime: "",
        reservationDate: "",
        walkDuration: "60",
        name: "",
        email: "",
        phoneNumber: "",
        city: "skopje",
        municipality: "",
        address: "",
        dogBreed: "",
        walkType: "socialization",
    });

    async function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function submitForm(e) {
        e.preventDefault();
        const reservationDate = new Date(formData.reservationDate);

        try {
            const result = await addReservation(
                reservationDate,
                formData.reservationTime,
                parseInt(formData.walkDuration, 10),
                formData.name,
                formData.email,
                formData.phoneNumber,
                formData.city,
                formData.municipality,
                formData.address,
                formData.dogBreed,
                formData.walkType
            );

            if (result.status === 200) {
                setShowReservationModal(false);
                fetchReservations();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full flex items-center justify-center">
            <div className="p-4 h-2/3 border w-96 shadow-lg rounded-md bg-white text-charcoal flex flex-col gap-4">
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowReservationModal(false)}
                        className="px-2 text-base font-medium rounded-md border-[1px] border-black hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        x
                    </button>
                </div>
                <form className="w-full overflow-y-auto border-[1px] border-orange rounded-lg" onSubmit={submitForm}>
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="reservationDate" className="text-left">Датум</label>
                            <input
                                type="date"
                                id="reservationDate"
                                name="reservationDate"
                                value={formData.reservationDate}
                                onChange={handleInputChange}
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="reservationTime" className="text-left">Време</label>
                            <input
                                type="time"
                                id="reservationTime"
                                name="reservationTime"
                                value={formData.reservationTime}
                                onChange={handleInputChange}
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label htmlFor="dogBreed" className="text-left">Раса на куче</label>
                            <input
                                id="dogBreed"
                                name="dogBreed"
                                value={formData.dogBreed}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Доберман"
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="walkType" className="text-left">Тип на прошетка</label>
                            <div className="custom-select">
                                <select
                                    id="walkType"
                                    name="walkType"
                                    value={formData.walkType}
                                    onChange={handleInputChange}
                                    className="p-2 border-solid border-darkGray rounded-3xl border-[1px] w-full"
                                    required
                                >
                                    <option value="socialization">Социјализација</option>
                                    <option value="sport">Спорт</option>
                                    <option value="relax">Релакс</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="walkDuration" className="text-left">Времетраење на прошетка</label>
                            <div className="custom-select">
                                <select
                                    id="walkDuration"
                                    name="walkDuration"
                                    value={formData.walkDuration}
                                    onChange={handleInputChange}
                                    className="p-2 border-solid border-darkGray rounded-3xl border-[1px] w-full"
                                    required
                                >
                                    <option value="90">90 Минути</option>
                                    <option value="60">60 Минути</option>
                                    <option value="30">30 Минути</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-left">Име и презиме</label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Иван Ивановски"
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-left">Email</label>
                            <input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="ime.prezime@mail.com"
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phoneNumber" className="text-left">Телефон</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                type="tel"
                                placeholder="070 123 456"
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="city" className="text-left">Град</label>
                            <div className="custom-select">
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="p-2 border-solid border-darkGray rounded-3xl border-[1px] w-full"
                                    required
                                >
                                    <option value="skopje">Скопје</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="municipality" className="text-left">Општина</label>
                            <div className="custom-select">
                                <select
                                    id="municipality"
                                    name="municipality"
                                    value={formData.municipality}
                                    onChange={handleInputChange}
                                    className="p-2 border-solid border-darkGray rounded-3xl border-[1px] w-full"
                                    required
                                >
                                    <option value="">Општина</option>
                                    <option value="aerodrom">Аеродром</option>
                                    <option value="butel">Бутел</option>
                                    <option value="gazi_baba">Гази Баба</option>
                                    <option value="gjorce_petrov">Ѓорче Петров</option>
                                    <option value="karposh">Карпош</option>
                                    <option value="kisela_voda">Кисела Вода</option>
                                    <option value="centar">Центар</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="address" className="text-left">Адреса</label>
                            <input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Партизански Одреди бр. 18/2"
                                className="p-2 border-solid border-darkGray rounded-3xl border-[1px]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange h-10 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
                            disabled={!Object.values(formData).every((field) => field)}
                        >
                            Креирај резервација
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}