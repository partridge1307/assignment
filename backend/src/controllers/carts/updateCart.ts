import prisma from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { z } from "zod";

const cartSchema = z.object({
  book_id: z.number(),
  quantity: z.number().min(1).default(1),
  rent_to: z
    .string()
    .datetime()
    .refine((value) => new Date(value).getTime() - Date.now() > 10000),
});

const updateCart = async (ctx: HonoContext) => {
  try {
    const { book_id, quantity, rent_to } = cartSchema.parse(
      await ctx.req.json(),
    );
    const { id } = ctx.get("user");

    const updatedCart = await prisma.carts.update({
      where: {
        user_id_book_id: {
          user_id: id,
          book_id: book_id,
        },
      },
      data: {
        quantity,
        rent_to,
      },
    });

    return ctx.json({
      success: true,
      data: updatedCart,
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

    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "Internal server error",
      },
      500,
    );
  }
};

export default updateCart;
