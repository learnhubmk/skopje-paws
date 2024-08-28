"use server";

import { db } from "../database/database";
import { blogs } from "../database/schemas";
import { eq, desc } from "drizzle-orm";

export const addBlog = async (slugURL: string, title: string, sanitizedText: string, thumbnail: string, content: string, currentSlug: string): Promise<{ status: number; message: string }> => {
    try {
        const existingBlog = await db.select().from(blogs).where(eq(blogs.slugURL, currentSlug)).limit(1);

        if (existingBlog.length > 0) {
            const updateData = {
                slugURL,
                title,
                updatedAt: new Date(),
                sanitizedText,
                thumbnail,
                content,
            };
            await db
                .update(blogs)
                .set(updateData)
                .where(eq(blogs.slugURL, currentSlug));
            return { status: 200, message: 'Blog updated successfully!' };
        } else {
            const newBlog = {
                slugURL,
                title,
                sanitizedText,
                thumbnail,
                content,
            };
            await db.insert(blogs).values(newBlog);
            return { status: 200, message: 'Blog created successfully!' };
        }
    } catch (error) {
        return { status: 500, message: 'Failed to save blog!' };
    }
};

interface Blog {
    slugURL: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    sanitizedText: string;
    thumbnail: string;
    content: string;
}

export const selectBlog = async (slugURL: string): Promise<{ blog: Blog | null, error: string | null }> => {
    try {
        const results = await db.select().from(blogs).where(eq(blogs.slugURL, slugURL)).limit(1);

        if (results.length === 0) {
            return { blog: null, error: 'Blog not found' };
        }

        return { blog: results[0], error: null };
    } catch (error) {
        return { blog: null, error: 'Failed to find blog!' };
    }
};

export const retrieveBlogs = async (limit?: number): Promise<{ blog: Blog[] | null, error: string | null }> => {
    try {

        const results = await (limit ? db.select().from(blogs).orderBy(desc(blogs.createdAt)).limit(limit) : db.select().from(blogs).orderBy(desc(blogs.createdAt)));

        if (results.length === 0) {
            return { blog: null, error: 'No Blogs Found' };
        }

        return { blog: results, error: null };
    } catch (error) {
        return { blog: null, error: 'Failed to find blog!' };
    }
};
