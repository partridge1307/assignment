import "dotenv/config";
import type { Config } from 'drizzle-kit';

export default {
  schema: "./db/schema",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB__PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE || "postgres"
  }
} satisfies Config;
