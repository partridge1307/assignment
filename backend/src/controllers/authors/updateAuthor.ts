import { authors } from "$/db/schema/books";
import db from "@/config/db";
import logger from "@/config/logger";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
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

    logger.error(error);

    return ctx.json({
      success: false,
      message: "An error occurred while updating the author"
    });
  }
};

export default updateAuthor;
