"use server";

import { db } from "../database/database";
import { reservations } from "../database/schemas";
import { eq, gte } from "drizzle-orm";

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