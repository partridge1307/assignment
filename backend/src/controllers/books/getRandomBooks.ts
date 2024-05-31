import prisma from "@/config/db";
import type { Context } from "hono";

const getRandomBooks = async (ctx: Context) => {
  try {
    const sqlRaw = prisma.$queryRaw`SELECT id, name, cover FROM books ORDER BY random() LIMIT 10`;
    const randomBooks = await sqlRaw;

    return ctx.json({
      success: true,
      data: randomBooks,
    });
  } catch (error) {
    return ctx.json(
      {
        success: false,
        message: "An error occurred while fetching books",
      },
      500,
    );
  }
};

export default getRandomBooks;
