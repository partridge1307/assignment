import prisma from "@/config/db";
import type { Context } from "hono";

const getTopRented = async (ctx: Context) => {
  try {
    const topBooks = await prisma.books.findMany({
      orderBy: {
        sold: "desc",
      },
      take: 10,
      select: {
        id: true,
        name: true,
        cover: true,
      },
    });

    return ctx.json({
      success: true,
      data: topBooks,
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

export default getTopRented;
