"use server";

import { db } from "../database/database";
import { reservations } from "../database/schemas";
import { eq } from "drizzle-orm";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const TIME_ZONE = "Europe/Skopje";

//partial duplicate of reservationActions.tsx -> return type is different
export const retrieveReservations = async (date: Date): Promise<any[]> => {
    try {
        const zonedDate = formatInTimeZone(date, TIME_ZONE, "yyyy-MM-dd");
        const formattedDate = format(parseISO(zonedDate), "yyyy-MM-dd");

        const reservationsForDate = await db
            .select()
            .from(reservations)
            .where(eq(reservations.date, formattedDate));

        return reservationsForDate.map(reservation => {
            const reservationDate = parseISO(reservation.date);

            const utcDate = formatInTimeZone(reservationDate, TIME_ZONE, "iso");

            return {
                date: utcDate,
                time: reservation.time,
                duration: reservation.walkDuration
            };
        });
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        return [];
    }
};
