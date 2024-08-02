import {pgTable, serial, text} from "drizzle-orm/pg-core";

// THIS IS JUST AN EXAMPLE, DO NOT USE IT
export const demo = pgTable("demo", {
    id: serial("id"),
    value: text("value").notNull()
});