"use server";

import { db } from "../database/database";
import { reservations } from "../database/schemas";
import { eq, and } from "drizzle-orm";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const TIME_ZONE = "Europe/Skopje";

export const addReservation = async (
    date: Date,
    time: string,
    walkDuration: number,
    name: string,
    email: string,
    phoneNumber: string,
    city: string,
    municipality: string,
    address: string,
    dogBreed: string,
    walkType: string
): Promise<{ status: number; message: string }> => {
    try {
        const zonedDate = formatInTimeZone(date, TIME_ZONE, "yyyy-MM-dd");
        const formattedDate = format(parseISO(zonedDate), "yyyy-MM-dd");

        const existingReservation = await db
            .select()
            .from(reservations)
            .where(
                and(
                    eq(reservations.date, formattedDate),
                    eq(reservations.time, time)
                )
            );

        if (existingReservation.length === 0) {
            const newReservation = {
                date: formattedDate,
                time,
                walkDuration,
                name,
                email,
                phoneNumber,
                city,
                municipality,
                address,
                dogBreed,
                walkType
            };
            await db.insert(reservations).values(newReservation);
            return { status: 200, message: "Reservation created successfully!" };
        } else {
            return { status: 409, message: "This time slot is already reserved." };
        }
    } catch (error) {
        console.error("Error creating reservation:", error);
        return { status: 500, message: "Failed to save reservation." };
    }
};

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
