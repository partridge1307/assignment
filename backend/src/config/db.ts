import { PrismaClient } from "@prisma/client";
import logger from "./logger";

logger.info("Initialize database client...");

const prisma = new PrismaClient();

logger.info("Initialized database client!");

export default prisma;
