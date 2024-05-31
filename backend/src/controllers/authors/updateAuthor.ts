import prisma from "@/config/db";
import logger from "@/config/logger";
import { Prisma } from "@prisma/client";
import type { Context } from "hono";
import { z } from "zod";

const authorSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const updateAuthor = async (ctx: Context) => {
  try {
    const { id, name } = authorSchema.parse(await ctx.req.json());

    const updatedAuthor = await prisma.authors.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return ctx.json({
      success: true,
      data: updatedAuthor,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return ctx.json(
          {
            success: false,
            message: "Author already exists",
          },
          400,
        );
      }
    }

    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "An error occurred while updating the author",
      },
      500,
    );
  }
};

export default updateAuthor;
