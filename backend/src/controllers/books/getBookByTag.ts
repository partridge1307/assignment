import prisma from "@/config/db";
import { book_tag } from "@prisma/client";
import type { Context } from "hono";

const getBookByTag = async (ctx: Context) => {
  try {
    const tag = ctx.req.query("tag");

    if (!tag)
      return ctx.json(
        {
          success: false,
          message: "No tag input",
        },
        409,
      );

    const books = await prisma.books.findMany({
      where: {
        tags: {
          has: book_tag[tag.toUpperCase() as book_tag],
        },
      },
    });

    return ctx.json({
      success: false,
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

export default getBookByTag;
