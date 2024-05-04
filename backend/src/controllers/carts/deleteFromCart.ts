import { carts } from "$/db/schema/carts";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const deleteFromCart = async (ctx: HonoContext) => {
  try {
    const bookId = Number(ctx.req.param('id'));
    const { id } = ctx.get('user');

    await db.delete(carts).where(and(eq(carts.user_id, id), eq(carts.book_id, bookId)));

    return ctx.json({}, 204)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      }, 400)
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: 'Internal server error',
    }, 500)
  }
}

export default deleteFromCart;
