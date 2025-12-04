import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/**
 * Contact messages table
 * Stores all contact form submissions
 */
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;

/**
 * Pricing estimates table
 * Stores calculator submissions with user selections
 */
export const pricingEstimates = sqliteTable("pricing_estimates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  totalPrice: integer("total_price").notNull(),
  selections: text("selections", { mode: "json" }).notNull(),
  breakdown: text("breakdown").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type PricingEstimate = typeof pricingEstimates.$inferSelect;
export type NewPricingEstimate = typeof pricingEstimates.$inferInsert;
