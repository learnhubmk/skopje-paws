'use client'

import Calendar from "react-calendar";
import { useState } from 'react';
import { add, format } from 'date-fns';
import { BREAK_TIME, INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from "@/constants/config";

interface DateType {
    justDate: Date | null,
    dateTime: Date | null
}


const ReactCalendar = () => {
    const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })

    const getTimes = () => {
        if (!date.justDate) return;

        const { justDate } = date;

        const beginning = add(justDate, { hours: STORE_OPENING_TIME });
        const end = add(justDate, { hours: STORE_CLOSING_TIME });
        const interval = INTERVAL;
        const breakTime = BREAK_TIME;

        const times = [];
        let current = beginning;

        while (current <= end) {
            const nextInterval = add(current, { minutes: interval });
            if (nextInterval > end) break;
            times.push({ start: current, end: nextInterval });
            current = add(nextInterval, { minutes: breakTime });
        }

        return times;
    };

    const handleButtonClick = (start: Date) => {
        setDate((prev) => ({ ...prev, dateTime: start }));
        setShowForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);
    };

    const times = getTimes()

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-row items-center justify-center rounded-3xl h-80 w-80">
                <Calendar
                    minDate={new Date()}
                    onClickDay={(selectedDate) => setDate((prev) => ({ ...prev, justDate: selectedDate }))}
                    view="month"
                    className="REACT-CALENDAR p-2"
                />
                {date.justDate && !showForm && (
                    <div className="flex gap-4 flex-wrap">
                        {times.map(({ start, end }) => (
                            <button
                                className="text-black bg-orange flex flex-row p-2 m-1 rounded"
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