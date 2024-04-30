import db from "@/config/db";
import type { Context } from "hono";

const getBooks = async (ctx: Context) => {
  const url = new URL(ctx.req.url);
  let bookName = url.searchParams.get("name");

  if (!bookName) {
    return ctx.json({
      success: false,
      message: "Please provide a book name",
    }, 400)
  }

  bookName = decodeURIComponent(bookName);

  try {
    const books = await db.query.books.findMany({
      where: ((books, { ilike }) => ilike(books.name, bookName))
    });

    return ctx.json({
      success: true,
      data: books
    })
  } catch (error) {
    return ctx.json({
      success: false,
      message: "An error occurred while fetching books"
    }, 500);
  }
}

export default getBooks;
