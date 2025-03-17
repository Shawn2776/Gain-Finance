import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const transactions = pgTable("user_transactions", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id")
    .notNull()
    .references(() => users.clerkId, { onDelete: "cascade" }), // Reference `clerkId` instead of `userId`
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., "deposit", "withdrawal"
  status: varchar("status", { length: 50 }).default("pending"), // e.g., "pending", "completed"
  description: text("description").notNull(), // Add description (required)
  tags: text("tags").array(), // Add tags (optional, array of strings)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
