import { sql } from "drizzle-orm";
import {
  doublePrecision,
  integer,
  pgSchema,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const APP_CONFIG_TABLE_NAME = "app_configs";
export const PLACE_TABLE_NAME = "places";
export const PIN_TABLE_NAME = "pins";
export const PIN_TAG_TABLE_NAME = "pin_tags";
export const PIN_GROUP_TABLE_NAME = "pin_groups";
export const PIN_GROUP_PIN_TABLE_NAME = "pin_group_pins";

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

export const places = pgTable(
  PLACE_TABLE_NAME,
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 128 }).notNull(),
    category_group_code: varchar("category_group_code", {
      length: 128,
    }).notNull(),
    category_group_name: varchar("category_group_name", {
      length: 128,
    }).notNull(),
    category_name: varchar("category_name", { length: 128 }).notNull(),
    distance: doublePrecision("distance").notNull(),
    phone: varchar("phone", { length: 32 }),
    address_name: varchar("address_name", { length: 255 }).notNull(),
    road_address_name: varchar("road_address_name", { length: 255 }),
    kakao_place_id: varchar("kakao_place_id", { length: 255 }).notNull(),
    x: varchar("x", { length: 255 }).notNull(),
    y: varchar("y", { length: 255 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deleted_at: timestamp("deleted_at", { withTimezone: true }),
  },
  table =>
    ({
      nameXyUnique: uniqueIndex("places_name_xy_unique").on(
        table.name,
        table.x,
        table.y,
      ),
      kakaoPlaceIdUnique: uniqueIndex("places_kakao_place_id_unique").on(
        table.kakao_place_id,
      ),
    }) as any,
);

export type PlaceData = typeof places.$inferSelect;
export type PlaceInsert = typeof places.$inferInsert;

export const pins = pgTable(
  PIN_TABLE_NAME,
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    place_id: uuid("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    media_type: varchar("media_type", { length: 32 }).notNull(),
    media_url: varchar("media_url", { length: 255 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deleted_at: timestamp("deleted_at", { withTimezone: true }),
  },
  table =>
    ({
      userIdPlaceIdUnique: uniqueIndex("pins_user_id_place_id_unique")
        .on(table.user_id, table.place_id)
        .where(sql`${table.deleted_at} is null`),
    }) as any,
);

export type PinData = typeof pins.$inferSelect;
export type PinInsert = typeof pins.$inferInsert;

export const pinGroups = pgTable(PIN_GROUP_TABLE_NAME, {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 64 }).notNull(),
  description: varchar("description", { length: 255 }),
  color: varchar("color", { length: 64 }).notNull(),
  background_color: varchar("background_color", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 12 }).notNull(),
  border_color: varchar("border_color", { length: 12 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export type PinGroupData = typeof pinGroups.$inferSelect;
export type PinGroupInsert = typeof pinGroups.$inferInsert;

export const pinGroupPins = pgTable(
  PIN_GROUP_PIN_TABLE_NAME,
  {
    id: uuid("id").defaultRandom().primaryKey(),
    pin_group_id: uuid("pin_group_id")
      .notNull()
      .references(() => pinGroups.id, { onDelete: "cascade" }),
    pin_id: uuid("pin_id")
      .notNull()
      .references(() => pins.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deleted_at: timestamp("deleted_at", { withTimezone: true }),
  },
  table =>
    ({
      pinGroupIdPinIdUnique: uniqueIndex(
        "pin_group_pins_pin_group_id_pin_id_unique",
      )
        .on(table.pin_group_id, table.pin_id)
        .where(sql`${table.deleted_at} is null`),
    }) as any,
);

export type PinGroupPinData = typeof pinGroupPins.$inferSelect;
export type PinGroupPinInsert = typeof pinGroupPins.$inferInsert;
