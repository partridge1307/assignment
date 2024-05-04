import { histories } from "$/db/schema/histories";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { eq, sql } from "drizzle-orm";
import { carts } from "$/db/schema/carts";
import { DatabaseError } from "pg";
import { books } from "$/db/schema/books";

const addToHistories = async (ctx: HonoContext) => {
  const { id } = ctx.get('user')

  try {
    const products = await db.query.carts.findMany({
      where: (carts, { eq }) => eq(carts.user_id, id),
    })

    if (!products.length) {
      return ctx.json({
        success: false,
        message: 'Book not found in cart'
      }, 404)
    }

    const newHistories = products.map(cart => {
      return {
        user_id: id,
        book_id: cart.book_id,
        quantity: cart.quantity
      }
    })

    const history = await db.insert(histories).values(newHistories).returning();
    await db.delete(carts).where(eq(carts.user_id, id));
    await db.update(books).set({ sold: sql`${books.sold} + ${history.reduce((acc, curr) => (acc + curr.quantity), 0)}` }).where(eq(books.id, history[0].book_id))

    return ctx.json({
      success: true,
      data: history
    }, 201)
  } catch (error: any) {
    if (error instanceof DatabaseError) {
      if (error.code === '23505') {
        return ctx.json({
          success: false,
          message: 'Already purchased the book'
        }, 404)
      }
    }

    logger.error(error)

    return ctx.json({
      success: false,
      message: 'Failed to add to histories'
    }, 500)
  }
}

export default addToHistories;
