import { authors } from "$/db/schema/books";
import db from "@/config/db";
import logger from "@/config/logger";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { DatabaseError } from "pg";
import { z } from "zod";

const authorSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const updateAuthor = async (ctx: Context) => {
  try {
    const { id, name } = authorSchema.parse(await ctx.req.json());

    const updatedAuthor = await db.update(authors).set({ name }).where(eq(authors.id, id)).returning();

    return ctx.json({
      success: true,
      data: updatedAuthor
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors
      });
    }

    if (error instanceof DatabaseError) {
      if (error.code === "23505") {
        return ctx.json({
          success: false,
          message: "Author already exists"
        }, 400)
      }
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: "An error occurred while updating the author"
    }, 500)
  }
};

export default updateAuthor;
