import logger from "@/config/logger";
import type { Context } from "hono";

export const errorHanlder = (c: Context) => {
  logger.error(c.error);

  return c.json({
    success: false,
    message: c.error?.message,
    stack: Bun.env.NODE_ENV === "production" ? null : c.error?.stack
  }, 500);
}

export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `Not Found - ${c.req.method} | ${c.req.url}`,
  }, 404);
}
