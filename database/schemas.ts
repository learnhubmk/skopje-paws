import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  slugURL: varchar("slugURL").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  sanitizedText: varchar("sanitizedText").notNull(),
  thumbnail: varchar("thumbnail").notNull(),
  content: varchar("content").notNull(),
});
