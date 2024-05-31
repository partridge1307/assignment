import prisma from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  bookId: z.number(),
  quantity: z.number().default(1),
  rent_to: z
    .string()
    .datetime()
    .refine((value) => new Date(value).getTime() - Date.now() > 10000),
});

export const addToCart = async (ctx: HonoContext) => {
  try {
    const { bookId, quantity, rent_to } = productSchema.parse(
      await ctx.req.json(),
    );
    const { id } = ctx.get("user");

    const newCart = {
      book_id: bookId,
      user_id: id,
      quantity,
      rent_to,
    };

    const cart = await prisma.carts.create({
      data: newCart,
    });

    return ctx.json({
      success: true,
      data: cart,
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
            message: "Book already in cart",
          },
          400,
        );
      }
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

export default addToCart;
