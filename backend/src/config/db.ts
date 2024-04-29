import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { schema } from "$/db/schema";
import logger from "./logger";

export const client = new Client({
  host: Bun.env.DB__HOST,
  port: Bun.env.DB__PORT,
  user: Bun.env.DB__USER,
  password: Bun.env.DB__PASS,
  database: Bun.env.DB__DATABASE
});

logger.info("Starting database connection...");
try {
  await client.connect();
} catch (error) {
  logger.error("Error connecting to database\n", error);
  process.exit(1);
}
logger.info("Database connection successful!");

export default drizzle(client, { schema });
