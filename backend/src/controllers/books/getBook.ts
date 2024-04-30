import db from "@/config/db";
import type { Context } from "hono";

const getBook = async (ctx: Context) => {
  const bookId = Number(ctx.req.param("id"));

  try {
    const book = await db.query.books.findFirst({
      where: (books, { eq }) => eq(books.id, bookId)
    })

    return ctx.json({
      success: true,
      data: book
    })
  } catch (error) {
    return ctx.json({
      success: false,
      message: "An error occurred while fetching book"
    }, 500);
  }
}

export default getBook;
