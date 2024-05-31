import prisma from "@/config/db";
import logger from "@/config/logger";
import type { Context } from "hono";

const getBooks = async (ctx: Context) => {
  const url = new URL(ctx.req.url);
  const page = Number(url.searchParams.get("page") || 1);

  try {
    const books = await prisma.books.findMany({
      select: {
        id: true,
        name: true,
        cover: true,
        sold: true,
        position: true,
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    return ctx.json({
      success: true,
      data: books,
    });
  } catch (error) {
    logger.info(error);
    return ctx.json(
      {
        success: false,
        message: "An error occurred while fetching books",
      },
      500,
    );
  }
};

export default getBooks;
