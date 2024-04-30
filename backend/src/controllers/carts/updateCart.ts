import { carts } from "$/db/schema/carts";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const cartSchema = z.object({
  book_id: z.number(),
  quantity: z.number().min(1).default(1)
})

const updateCart = async (ctx: HonoContext) => {
  try {
    const { book_id, quantity } = cartSchema.parse(await ctx.req.json());
    const { id } = ctx.get('user');

    const updatedCart = await db.update(carts).set({ quantity }).where(and(eq(carts.user_id, id), eq(carts.book_id, book_id))).returning();

    return ctx.json({
      success: true,
      data: updatedCart
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors
      }, 400)
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: "Internal server error"
    }, 500)
  }
}

export default updateCart;
