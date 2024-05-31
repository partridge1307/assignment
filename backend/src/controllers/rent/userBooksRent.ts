import prisma from "@/config/db";
import type { Context } from "hono";

const userBooksRent = async (ctx: Context) => {
  try {
    const user_id = Number(ctx.req.param("id"));

    const booksRent = await prisma.histories.findMany({
      where: {
        user_id,
      },
      select: {
        book_id: true,
        books: {
          select: {
            name: true,
            cover: true,
          },
        },
        quantity: true,
      },
    });

    return ctx.json({
      success: true,
      data: booksRent,
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

export default userBooksRent;
