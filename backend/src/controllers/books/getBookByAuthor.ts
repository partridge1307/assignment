import prisma from "@/config/db";
import type { Context } from "hono";

const getBookByAuthor = async (ctx: Context) => {
  try {
    const author_id = ctx.req.param("id");

    const books = await prisma.books.findMany({
      where: {
        author_id: Number(author_id),
      },
    });

    return ctx.json({
      success: true,
      data: books,
    });
  } catch (error) {
    return ctx.json(
      {
        success: false,
        message: "Something went wrong",
      },
      500,
    );
  }
};

export default getBookByAuthor;
