import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
    id: uuid("id").primaryKey().defaultRandom(),
    personalInfo: jsonb("personal_info").notNull(),
    businessInfo: jsonb("business_info").notNull(),
    files: jsonb("files").notNull(), // Stores array of file URLs
    status: text("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
