import prisma from "@/config/db";
import type { Context } from "hono";

const searchBooks = async (ctx: Context) => {
  const url = new URL(ctx.req.url);
  const query = url.searchParams.get("query");
  if (!query) return ctx.json({ error: "query is required" }, 400);

  try {
    const books = await prisma.books.findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
      },
    });

    return ctx.json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    return ctx.json({ success: false, message: "Something went wrong" }, 500);
  }
};

export default searchBooks;
