CREATE TABLE "example" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" text,
	"created_at" timestamp WITH time zone DEFAULT NOW(),
	"updated_at" timestamp WITH time zone DEFAULT NOW()
);