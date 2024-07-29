'use client'

import Calendar from "react-calendar";
import { useState, useEffect } from 'react';
import { add, format, startOfDay } from 'date-fns';
import { BREAK_TIME, INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from "./config";

interface DateType {
    justDate: Date | null,
    dateTime: Date | null
}

const ReactCalendar = () => {
    const today = startOfDay(new Date());
    const [showForm, setShowForm] = useState(false);
    const [showCalendar, setShowCalendar] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [date, setDate] = useState<DateType>({
        justDate: today,
        dateTime: null,
    });
    const [times, setTimes] = useState<{ start: Date; end: Date; }[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const getTimes = () => {
            if (!date.justDate) return [];

            const { justDate } = date;

            const beginning = add(justDate, { hours: STORE_OPENING_TIME });
            const end = add(justDate, { hours: STORE_CLOSING_TIME });
            const interval = INTERVAL;
            const breakTime = BREAK_TIME;

            const newTimes = [];
            let current = beginning;

            while (current <= end) {
                const nextInterval = add(current, { minutes: interval });
                if (nextInterval > end) break;
                newTimes.push({ start: current, end: nextInterval });
                current = add(nextInterval, { minutes: breakTime });
            }

            return newTimes;
        };

        setTimes(getTimes());
    }, [date.justDate]);

    const handleDateClick = (selectedDate: Date) => {
        setDate({
            justDate: selectedDate,
            dateTime: null
        });
        if (isMobile) {
            setShowCalendar(false);
        }
        setShowForm(false);
    };

    const handleButtonClick = (start: Date) => {
        setDate((prev) => ({ ...prev, dateTime: start }));
        setShowForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);
    };

    const handleBackButtonClick = () => {
        setShowForm(false);
        setShowCalendar(true);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex md:flex-row items-center justify-center rounded-3xl relative w-full md:w-auto p-10 sm:p-0 gap-8">
                {showCalendar && (
                    <div className={`md:block ${showForm ? 'hidden' : 'block'} transition-all`}>
                        <Calendar
                            minDate={new Date()}
                            onClickDay={handleDateClick}
                            view="month"
                            className="react-calendar p-2"
                        />
                    </div>
                )}
                {date.justDate && !showForm && (
                    <div className={`sm:flex flex-col w-full md:w-80 items-center h-calendarHeight rounded-3xl shadow-xl gap-1 ${!showCalendar && date.justDate ? 'flex' : 'hidden'}`}>
                        <div className="bg-orange mb-1 h-16 w-full rounded-t-3xl flex items-center justify-center text-black">
                            {format(date.justDate, 'MMMM dd, EEEE')}
                        </div>
                        {times.map(({ start, end }) => (
                            <button
                                className="text-black p-2 rounded-4xl border border-orange max-w-full w-64 h-8 items-center flex justify-center text-lg"
                                key={start.toString()}
                                type="button"
                                onClick={() => handleButtonClick(start)}
                            >
                                {format(start, 'kk:mm')} - {format(end, 'kk:mm')}
                            </button>
                        ))}
                    </div>
                )}
                {showForm && (
                    <div className="flex flex-col w-full md:w-80 items-center h-calendarHeight rounded-3xl shadow-xl">
                        <div className="bg-orange h-16 w-full rounded-t-3xl flex items-center justify-center text-black">
                            {format(date.justDate, 'MMMM dd, EEEE')}
                        </div>
                        <button className="text-black flex w-10/12 mt-4" onClick={handleBackButtonClick}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 mr-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Назад кон време
                        </button>
                        <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-2 mt-4 w-10/12">
                            <label htmlFor="race" className="w-full justify-start flex text-black">Раса на куче</label>
                            <input
                                id="race"
                                type="text"
                                placeholder="Доберман"
                                className="text-base py-1 pl-4 border border-gray rounded-4xl text-black w-full mt-1 mb-3"
                                required
                            />

                            <label htmlFor="select1" className="w-full justify-start flex text-black">Тип на прошетка</label>
                            <select
                                id="select1"
                                className="py-1 pl-4 border border-gray rounded-4xl text-black w-full mt-1 mb-3"
                                required
                            >
                                <option value="" disabled selected hidden>Социјализација</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>

                            <label htmlFor="select2" className="w-full justify-start flex text-black">Времетраење на прошетка</label>
                            <select
                                id="select2"
                                className="py-1 pl-4 border border-gray rounded-4xl text-black w-full mt-1 mb-3"
                                required
                            >
                                <option value="" disabled selected hidden>1:30 минути</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>

                            <button
                                type="submit"
                                className="bg-orange text-white p-2 rounded-xl mt-9 w-full"
                            >
                                Закажи термин
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReactCalendar;
