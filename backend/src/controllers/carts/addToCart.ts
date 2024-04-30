import { carts, type newCart } from "$/db/schema/carts";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { DatabaseError } from "pg";
import { z } from "zod";

const productSchema = z.object({
  bookId: z.number(),
  quantity: z.number().default(1),
});

export const addToCart = async (ctx: HonoContext) => {
  try {
    const { bookId, quantity } = productSchema.parse(await ctx.req.json());
    const { id } = ctx.get('user');

    const newCart: newCart = {
      book_id: bookId,
      user_id: id,
      quantity,
    }

    const cart = await db.insert(carts).values(newCart).returning();

    return ctx.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      }, 400)
    }

    if (error instanceof DatabaseError) {
      if (error.code === '23505') {
        return ctx.json({
          success: false,
          message: 'Book already in cart',
        }, 400)
      }
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: 'Internal server error',
    }, 500)

  }
}

export default addToCart;
