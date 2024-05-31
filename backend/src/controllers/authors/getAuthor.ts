import prisma from "@/config/db";
import logger from "@/config/logger";
import type { Context } from "hono";

const getAuthor = async (ctx: Context) => {
  const url = new URL(ctx.req.url);
  let authorName = url.searchParams.get("name");

  if (!authorName) {
    return ctx.json({ error: "Author name is required" }, 400);
  }

  authorName = decodeURIComponent(authorName);

  try {
    const authors = await prisma.authors.findMany({
      where: {
        name: {
          contains: `%${authorName}%`,
        },
      },
    });

    return ctx.json({
      success: true,
      data: authors,
    });
  } catch (error) {
    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "An error occurred while fetching author",
      },
      500,
    );
  }
};

export default getAuthor;
