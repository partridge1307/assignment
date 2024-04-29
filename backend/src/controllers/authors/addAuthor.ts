import { authors } from "$/db/schema/books";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { DatabaseError } from "pg";
import { z } from "zod";

const authorSchema = z.object({
  name: z.string(),
});

const addAuthor = async (ctx: HonoContext) => {
  try {
    const { name } = authorSchema.parse(await ctx.req.json());
    const author = await db.insert(authors).values({
      name,
    }).returning();

    return ctx.json({
      success: true,
      data: author,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      }, 400);
    }

    if (error instanceof DatabaseError) {
      if (error.code === "23505") {
        return ctx.json({
          success: false,
          message: "Author already exists",
        }, 400);
      }
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: "Something went wrong",
    }, 500);
  }
}

export default addAuthor;
