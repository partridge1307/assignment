import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, { client } from "@/config/db";
import logger from "@/config/logger";

logger.info("Migrating database...");
try {
  await migrate(db, { migrationsFolder: "./db/migrations" })
  await client.end();
  logger.info("Database migration successful!");
} catch (error) {
  logger.error("Error migrating database\n", error);
}
