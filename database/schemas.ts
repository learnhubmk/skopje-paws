import {
  pgTable,
  varchar,
  timestamp,
  date,
  time,
  integer,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  slugURL: varchar("slugURL").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  sanitizedText: varchar("sanitizedText").notNull(),
  thumbnail: varchar("thumbnail").notNull(),
  content: varchar("content").notNull(),
});

export const reservations = pgTable("reservations", {
  date: date("date").notNull(),
  time: time("time").notNull(),
  walkDuration: integer("walkDuration").notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 32 }).notNull(),
  city: varchar("city", { length: 128 }).notNull(),
  municipality: varchar("municipality", { length: 128 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  dogBreed: varchar("dogBreed", { length: 128 }).notNull(),
  walkType: varchar("walkType", { length: 64 }).notNull(),
  reservedAt: timestamp("reservedAt").defaultNow().notNull(),
});