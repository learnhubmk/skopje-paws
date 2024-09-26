"use client"

import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import { add, startOfDay, isAfter, isBefore, isEqual, setHours, setMinutes } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";
import { BREAK_TIME, CLOSING_TIME, OPENING_TIME, PAUSE_TIME, CONTINUE_TIME } from "./config";
import { Montserrat } from "next/font/google";
import { retrieveReservations, addReservation } from "../../actions/calendarActions";

const montserrat = Montserrat({ subsets: ["latin"] });

const TIME_ZONE = "Europe/Skopje";

const ReactCalendar = () => {
    const today = startOfDay(toZonedTime(new Date(), TIME_ZONE));
    const [date, setDate] = useState({
        justDate: today,
        dateTime: null,
    });
    const [times, setTimes] = useState({ firstHalfTimes: [], secondHalfTimes: [] });
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        dogBreed: "",
        walkType: "socialization",
        walkDuration: "60",
        name: "",
        email: "",
        phoneNumber: "",
        city: "skopje",
        municipality: "",
        address: "",
    });

    const fetchReservations = useCallback(async (date: Date) => {
        try {
            return await retrieveReservations(date);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            return [];
        }
    }, []);

    const getTimes = useCallback(async () => {
        if (!date.justDate) return { firstHalfTimes: [], secondHalfTimes: [] };

        const beginning = setMinutes(setHours(date.justDate, OPENING_TIME), 0);
        const end = setMinutes(setHours(date.justDate, CLOSING_TIME), 0);
        const pauseStart = setMinutes(setHours(date.justDate, PAUSE_TIME), 0);
        const continueTime = setMinutes(setHours(date.justDate, CONTINUE_TIME), 0);
        const customInterval = parseInt(formData.walkDuration, 10);

        const reservations = await fetchReservations(date.justDate);

        const firstHalfTimes = [];
        const secondHalfTimes = [];
        let current = beginning;

        while (current < end) {
            const nextInterval = add(current, { minutes: customInterval });

            if (isAfter(nextInterval, pauseStart) && isBefore(current, continueTime)) {
                current = continueTime;
                continue;
            }

            if (isAfter(nextInterval, end)) break;

            const isAvailable = !reservations.some(reservation => {
                const reservationStart = setHours(setMinutes(date.justDate, parseInt(reservation.time.split(":")[1], 10)), parseInt(reservation.time.split(":")[0], 10));
                const reservationEnd = add(reservationStart, { minutes: reservation.duration });

                return (
                    (isEqual(current, reservationStart) || isAfter(current, reservationStart)) &&
                    isBefore(current, reservationEnd)
                ) || (
                        isEqual(nextInterval, reservationStart) ||
                        (isAfter(nextInterval, reservationStart) && isBefore(nextInterval, reservationEnd)) ||
                        (isBefore(current, reservationStart) && isAfter(nextInterval, reservationStart))
                    );
            });

            if (isAvailable) {
                if (isBefore(current, continueTime)) {
                    firstHalfTimes.push({ start: current, end: nextInterval });
                } else {
                    secondHalfTimes.push({ start: current, end: nextInterval });
                }
                current = add(current, { minutes: 30 });
            } else {
                const conflictingReservation = reservations.find(reservation => {
                    const reservationStart = setHours(setMinutes(date.justDate, parseInt(reservation.time.split(":")[1], 10)), parseInt(reservation.time.split(":")[0], 10));
                    const reservationEnd = add(reservationStart, { minutes: reservation.duration });

                    return (
                        isAfter(reservationEnd, current) ||
                        isEqual(reservationStart, nextInterval) ||
                        (isBefore(current, reservationStart) && isAfter(nextInterval, reservationStart))
                    );
                });

                if (conflictingReservation) {
                    const reservationStart = setHours(setMinutes(date.justDate, parseInt(conflictingReservation.time.split(":")[1], 10)), parseInt(conflictingReservation.time.split(":")[0], 10));
                    const reservationEnd = add(reservationStart, { minutes: conflictingReservation.duration });
                    current = add(reservationEnd, { minutes: BREAK_TIME });
                } else {
                    current = add(current, { minutes: customInterval });
                }
            }
        }

        return { firstHalfTimes, secondHalfTimes };
    }, [date.justDate, formData.walkDuration, fetchReservations]);

    useEffect(() => {
        getTimes().then(setTimes);
    }, [getTimes]);

    const { firstHalfTimes, secondHalfTimes } = times;

    const handleDateClick = (selectedDate: Date) => {
        const justDate = startOfDay(toZonedTime(selectedDate, TIME_ZONE));

        setDate({
            justDate,
            dateTime: null
        });

        !formData.dogBreed ? setCurrentStep(0) : setCurrentStep(1);
    };

    const handleButtonClick = (start) => {
        setDate(prev => ({ ...prev, dateTime: start }));
        setCurrentStep(2);
    };

    const handleInputChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.id]: e.target.value
        }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date.dateTime) return;

        const reservationDate = toZonedTime(date.justDate, TIME_ZONE);
        const reservationTime = formatTz(date.dateTime, "HH:mm", { timeZone: TIME_ZONE });

        try {
            const result = await addReservation(
                reservationDate,
                reservationTime,
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
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    };

    const renderFristHalfSlots = () => (
        <div className="flex flex-col gap-1">
            {firstHalfTimes.map(({ start, end }, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(start)}
                    className="h-10 rounded-3xl border-orange border-[1px] hover:bg-orange"
                >
                    {formatTz(start, "HH:mm", { timeZone: TIME_ZONE })} - {formatTz(end, "HH:mm", { timeZone: TIME_ZONE })}
                </button>
            ))}
        </div>
    );

    const renderSecondHalfSlots = () => (
        <div className="flex flex-col gap-1">
            {secondHalfTimes.map(({ start, end }, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(start)}
                    className="h-10 rounded-3xl border-orange border-[1px] hover:bg-orange"
                >
                    {formatTz(start, "HH:mm", { timeZone: TIME_ZONE })} - {formatTz(end, "HH:mm", { timeZone: TIME_ZONE })}
                </button>
            ))}
        </div>
    );

    function validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^(\+?\(?\d{1,4}\)?[\d\s\-]*)$/;
        const digitCount = phoneNumber.replace(/\D/g, "").length;
        return phoneRegex.test(phoneNumber) && digitCount >= 9;
    }

    return (
        <div className={`${montserrat.className} flex items-center justify-center font-sans py-8 px-2 text-charcoal`}>
            <div className="flex flex-col lg:flex-row items-center justify-center rounded-3xl relative w-full md:w-auto p-10 sm:p-0 gap-8">
                <Calendar
                    minDate={new Date()}
                    onClickDay={handleDateClick}
                    value={date.justDate}
                    view="month"
                    className="p-2"
                />
                <div className="flex flex-col w-full max-w-80 items-center rounded-3xl shadow-xl h-calendarHeight">
                    <div className="bg-orange min-h-16 w-full rounded-t-3xl flex items-center justify-center text-black flex-col">
                        {formatTz(date.justDate, "MMMM dd, EEEE", { timeZone: TIME_ZONE })}
                        {date.dateTime && (
                            <div className="text-black flex">
                                {formatTz(date.dateTime, "HH:mm", { timeZone: TIME_ZONE })} - {formatTz(add(date.dateTime, { minutes: parseInt(formData.walkDuration) }), "HH:mm", { timeZone: TIME_ZONE })}
                            </div>
                        )}
                    </div>
                    <form className="h-full w-full overflow-y-auto" onSubmit={submitForm}>
                        {currentStep === 0 && (
                            <div className="flex flex-col justify-between h-full p-5 w-full">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-left">Раса на куче</div>
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
                                        <div className="text-left">Тип на прошетка</div>
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
                                        <div className="text-left">Времетраење на прошетка</div>
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
                                </div>
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className={`w-full bg-orange h-10 rounded-lg ${!formData.dogBreed ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={!formData.dogBreed}
                                >
                                    Следен чекор
                                </button>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="flex flex-col justify-start h-full px-5 pb-5 pt-2 w-full gap-2 overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    <a
                                        onClick={() => setCurrentStep(0)}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                        </svg>
                                        Назад кон информации
                                    </a>
                                </div>
                                {renderFristHalfSlots()}
                                <div className="flex items-center px-4">
                                    <div className="flex-grow h-px bg-black" />
                                    <span className="px-2">Пауза од 11 до 16</span>
                                    <div className="flex-grow h-px bg-black" />
                                </div>
                                {renderSecondHalfSlots()}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="flex flex-col justify-between h-full px-5 pb-5 pt-2 w-full">
                                <div className="flex flex-col gap-2">
                                    <a
                                        onClick={() => setCurrentStep(1)}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                        </svg>
                                        Назад кон термин
                                    </a>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-left">Град</div>
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
                                        <div className="text-left">Општина</div>
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
                                        <div className="text-left">Адреса</div>
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
                                </div>
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className={`w-full bg-orange h-10 rounded-lg ${(!formData.city || !formData.municipality || !formData.address) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={!formData.city || !formData.municipality || !formData.address}
                                >
                                    Следен чекор
                                </button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="flex flex-col justify-between h-full px-5 pb-5 pt-2 w-full">
                                <div className="flex flex-col gap-2">
                                    <a
                                        onClick={() => setCurrentStep(2)}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                        </svg>
                                        Назад кон локација
                                    </a>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-left">Име и презиме</div>
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
                                        <div className="text-left">Email</div>
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
                                        <div className="text-left">Телефон</div>
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
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full bg-orange h-10 rounded-lg ${(!formData.name || !validateEmail(formData.email) || !validatePhoneNumber(formData.phoneNumber)) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={!formData.name || !validateEmail(formData.email) || !validatePhoneNumber(formData.phoneNumber)}
                                >
                                    Закжи термин
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReactCalendar;