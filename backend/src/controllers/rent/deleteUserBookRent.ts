import prisma from "@/config/db";
import type { Context } from "hono";
import { z } from "zod";

const deleteSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
});

const deleteUserBookRent = async (ctx: Context) => {
  try {
    const { user_id, book_id } = deleteSchema.parse(await ctx.req.json());

    await prisma.histories.delete({
      where: {
        user_id_book_id: {
          user_id,
          book_id,
        },
      },
    });

    return ctx.json(
      {
        success: true,
        data: null,
      },
      204,
    );
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

export default deleteUserBookRent;
