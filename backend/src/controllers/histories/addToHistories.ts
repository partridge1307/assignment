import { histories, type newHistory } from "$/db/schema/histories";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { z } from "zod";

const historySchema = z.object({
  bookId: z.number(),
})

const addToHistories = async (ctx: HonoContext) => {
  const { id } = ctx.get('user')

  try {
    const { bookId } = historySchema.parse(await ctx.req.json());

    const cart = await db.query.carts.findFirst({
      where: (carts, { and, eq }) => and(eq(carts.book_id, bookId), eq(carts.user_id, id))
    })

    if (!cart) {
      return ctx.json({
        success: false,
        message: 'Book not found in cart'
      }, 404)
    }

    const newHistory: newHistory = {
      user_id: id,
      book_id: bookId,
      quantity: cart.quantity
    }

    const history = await db.insert(histories).values(newHistory).returning();
    return ctx.json({
      success: true,
      data: history
    }, 201)
  } catch (error) {
    logger.error(error)
    return ctx.json({
      success: false,
      message: 'Failed to add to histories'
    }, 500)
  }
}

export default addToHistories;
