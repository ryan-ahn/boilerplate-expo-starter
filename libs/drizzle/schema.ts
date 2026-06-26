import { sql } from "drizzle-orm";
import {
  integer,
  pgSchema,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const APP_CONFIG_TABLE_NAME = "app_configs";

const auth = pgSchema("auth");

export const authUsers = auth.table("users", {
  id: uuid("id").primaryKey(),
});

export const appConfigs = pgTable(APP_CONFIG_TABLE_NAME, {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  key: varchar("key", { length: 32 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  version: varchar("version", { length: 32 }).notNull(),
  value_type: varchar("value_type", { length: 32 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export type AppConfigData = typeof appConfigs.$inferSelect;
export type AppConfigInsert = typeof appConfigs.$inferInsert;
