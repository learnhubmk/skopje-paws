import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content").notNull(),
  slugURL: varchar("slugURL").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
