import {defineConfig} from "drizzle-kit";

export const dbURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_IP}:5432/${process.env.POSTGRES_DB}`;


export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schemas.ts",
    out: "./database/migrations",
    dbCredentials: {
        url: dbURL
    }
});