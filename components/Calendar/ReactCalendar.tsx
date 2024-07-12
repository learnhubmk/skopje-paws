'use client'

import Calendar from "react-calendar";
import { useState, useEffect } from 'react';
import { add, format } from 'date-fns';
import { BREAK_TIME, INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from "./config";

interface DateType {
    justDate: Date | null,
    dateTime: Date | null
}

const ReactCalendar = () => {
    const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    });
    const [times, setTimes] = useState<{ start: Date; end: Date; }[]>([]);

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

    const handleButtonClick = (start: Date) => {
        setDate((prev) => ({ ...prev, dateTime: start }));
        setShowForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-row items-center justify-center rounded-3xl relative">
                <Calendar
                    minDate={new Date()}
                    onClickDay={(selectedDate) => {
                        setDate({
                            justDate: selectedDate,
                            dateTime: null
                        });
                        setShowForm(false);
                    }}
                    view="month"
                    className="react-calendar p-2"
                />
                {date.justDate && !showForm && (
                    <div className="flex flex-col justify-end w-80 items-center h-calendarHeight rounded-3xl shadow-xl">
                        <div className="bg-orange h-16 w-full rounded-t-3xl flex items-center justify-center text-black">
                            {format(date.justDate, 'MMMM dd EEEE')}
                        </div>
                        {times.map(({ start, end }) => (
                            <button
                                className="text-black p-2 m-[3px] rounded-4xl border-2 border-orange w-64 h-8 items-center flex justify-center text-lg"
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
                    <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Input 1"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Input 2"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Input 3"
                            className="p-2 border rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ReactCalendar;
