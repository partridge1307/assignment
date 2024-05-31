import prisma from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const authorSchema = z.object({
  name: z.string(),
});

const addAuthor = async (ctx: HonoContext) => {
  try {
    const { name } = authorSchema.parse(await ctx.req.json());
    const author = await prisma.authors.create({
      data: {
        name,
      },
    });

    return ctx.json({
      success: true,
      data: author,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json(
        {
          success: false,
          message: error.errors,
        },
        400,
      );
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
        message: "Something went wrong",
      },
      500,
    );
  }
};

export default addAuthor;
