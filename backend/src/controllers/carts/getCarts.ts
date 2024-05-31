import prisma from "@/config/db";
import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";

const getCarts = async (ctx: HonoContext) => {
  const { id } = ctx.get("user");

  try {
    const carts = await prisma.carts.findMany({
      where: {
        user_id: id,
      },
      select: {
        books: {
          select: {
            cover: true,
            name: true,
          },
        },
        user_id: true,
        book_id: true,
        quantity: true,
        rent_to: true,
      },
    });

    return ctx.json({
      success: true,
      data: carts,
    });
  } catch (error) {
    logger.error(error);
    return ctx.json(
      {
        success: false,
        message: "Failed to get carts",
      },
      500,
    );
  }
};

export default getCarts;
