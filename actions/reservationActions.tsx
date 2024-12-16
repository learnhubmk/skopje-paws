"use server";

import { db } from "../database/database";
import { reservations } from "../database/schemas";
import {and, eq, gte} from "drizzle-orm";
import {formatInTimeZone} from "date-fns-tz";
import {format, parseISO} from "date-fns";

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
        const TIME_ZONE = "Europe/Skopje";
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
export const retrieveReservations = async (fromDate?: string): Promise<{ reservations: any | null; error: string | null }> => {
    try {
        if (fromDate) {
            const results = await db
                .select()
                .from(reservations)
                .where(gte(reservations.date, fromDate))
                .orderBy(reservations.date);

            if (results.length === 0) {
                return { reservations: null, error: "No Reservations Found" };
            }
            return { reservations: results, error: null };
        } else {
            const results = await db
                .select()
                .from(reservations)
                .orderBy(reservations.date);

            if (results.length === 0) {
                return { reservations: null, error: "No Reservations Found" };
            }
            return { reservations: results, error: null };
        }

    } catch (error) {
        console.error("Error fetching reservations:", error);
        return { reservations: null, error: "Failed to find reservations!" };
    }
};

export const deleteReservation = async (id: number): Promise<{ success: boolean; error: string | null }> => {
    try {
        const result = await db
            .delete(reservations)
            .where(eq(reservations.id, id));

        if (result.rowCount === 0) {
            return { success: false, error: "Reservation not found" };
        }

        return { success: true, error: null };
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return { success: false, error: "Failed to delete reservation" };
    }
};

export const getReservationsFromYesterday = async (): Promise<{ reservations: any | null; error: string | null }> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];

    return await retrieveReservations(formattedDate);
};