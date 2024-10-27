"use server";

import { db } from "../database/database";
import { reservations } from "../database/schemas";
import { gte } from "drizzle-orm";

export const retrieveReservations = async (fromDate: string): Promise<{ reservations: any[] | null; error: string | null }> => {
    try {
        const results = await db
            .select()
            .from(reservations)
            .where(gte(reservations.date, fromDate))
            .orderBy(reservations.date);

        if (results.length === 0) {
            return { reservations: null, error: "No Reservations Found" };
        }

        return { reservations: results, error: null };
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return { reservations: null, error: "Failed to find reservations!" };
    }
};

export const getReservationsFromYesterday = async (): Promise<{ reservations: any[] | null; error: string | null }> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];

    return await retrieveReservations(formattedDate);
};