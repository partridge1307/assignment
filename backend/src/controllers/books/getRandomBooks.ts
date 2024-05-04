import { books } from "$/db/schema/books";
import db from "@/config/db";
import { sql } from "drizzle-orm";
import type { Context } from "hono";

const getRandomBooks = async (ctx: Context) => {
  try {
    const randomBooks = await db.select({
      id: books.id,
      name: books.name,
      cover: books.cover,
      price: books.price,
      on_sale: books.on_sale
    }).from(books).limit(10).orderBy(sql`RANDOM()`);

    return ctx.json({
      success: true,
      data: randomBooks
    })
  } catch (error) {
    return ctx.json({
      success: false,
      message: "An error occurred while fetching books"
    }, 500);
  }
}

export default getRandomBooks
