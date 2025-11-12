import "dotenv/config";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Ensure DATABASE_URL is available when Prisma loads this config.
// Prisma may load this file before its own .env handling, so we hydrate here.
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: "prisma/.env" });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
