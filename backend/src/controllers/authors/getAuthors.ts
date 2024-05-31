import prisma from "@/config/db";
import type { Context } from "hono";

const getAuthors = async (ctx: Context) => {
  try {
    const authors = await prisma.authors.findMany();

    return ctx.json({
      success: true,
      data: authors,
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

export default getAuthors;
