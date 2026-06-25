import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./libs/drizzle/schema.ts",
  out: "./libs/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
