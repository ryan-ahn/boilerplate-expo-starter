import {
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const APP_CONFIG_TABLE_NAME = "app_configs";
export const COUPLE_INVITES_TABLE_NAME = "couple_invites";
export const COUPLES_TABLE_NAME = "couples";

const auth = pgSchema("auth");

const authUsers = auth.table("users", {
  id: uuid("id").primaryKey(),
});

export const coupleInviteStatusEnum = pgEnum("couple_invite_status", [
  "pending",
  "accepted",
  "expired",
  "cancelled",
]);

export const coupleStatusEnum = pgEnum("couple_status", ["active", "ended"]);

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

export const coupleInvites = pgTable(COUPLE_INVITES_TABLE_NAME, {
  id: uuid("id").primaryKey().defaultRandom(),
  inviterUserId: uuid("inviter_user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  invitePhone: varchar("invite_phone", { length: 20 }).notNull(),
  inviteName: varchar("invite_name", { length: 100 }),
  status: coupleInviteStatusEnum("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  acceptedByUserId: uuid("accepted_by_user_id").references(() => authUsers.id, {
    onDelete: "set null",
  }),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export const couples = pgTable(COUPLES_TABLE_NAME, {
  id: uuid("id").primaryKey().defaultRandom(),
  userAId: uuid("user_a_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  userBId: uuid("user_b_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  inviteId: uuid("invite_id").references(() => coupleInvites.id, {
    onDelete: "set null",
  }),
  status: coupleStatusEnum("status").notNull().default("active"),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export type AppConfigData = typeof appConfigs.$inferSelect;
export type AppConfigInsert = typeof appConfigs.$inferInsert;
export type CoupleInviteData = typeof coupleInvites.$inferSelect;
export type CoupleInviteInsert = typeof coupleInvites.$inferInsert;
export type CoupleData = typeof couples.$inferSelect;
export type CoupleInsert = typeof couples.$inferInsert;
