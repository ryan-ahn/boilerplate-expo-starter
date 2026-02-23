import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	fullName: text("full_name"),
	phone: varchar({ length: 256 }),
});
