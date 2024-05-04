import db from "@/config/db";
import type { Context } from "hono";

const getBooks = async (ctx: Context) => {
  const url = new URL(ctx.req.url);
  const page = Number(url.searchParams.get("page") || 1);

  try {
    const books = await db.query.books.findMany({
      columns: {
        id: true,
        name: true,
        cover: true,
        price: true,
        sold: true,
        on_sale: true
      },
      limit: 10,
      offset: (page - 1) * 10
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
