"use server";

import { db } from "../database/database";
import { blogs } from "../database/schemas";

export const addBlog = async (title: string, content: string, slugURL: string): Promise<{ status: number; message: string }> => {
    try {
        await db.insert(blogs).values({
            title,
            content,
            slugURL,
        });
        return { status: 200, message: 'Blog saved successfully!' };
    } catch (error) {
        return { status: 500, message: 'Failed to save blog!' };
    }
};
