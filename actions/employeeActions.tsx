"use server";
import {db} from "../database/database";
import {employees} from "../database/schemas";

//todo add and delete employees
//todo instead of delete, maybe toggle inactive
//todo add to employee schema status: active/inactive
export const retrieveEmployees = async (): Promise<{ employees: any | null, error: string | null }> => {
    try {
        const results = await db
            .select()
            .from(employees)
            .orderBy(employees.created_at);
        return {employees: results, error: null}
    } catch (error) {
        console.error("Error fetching employees: ", error);
        return {employees: null, error: "Failed to fetch employees!"};
    }
}