import prisma from "@/config/db";
import type { HonoContext } from "@/types/hono";

const getHistories = async (ctx: HonoContext) => {
  const { id } = ctx.get("user");

  try {
    const histories = await prisma.histories.findMany({
      where: {
        user_id: id,
      },
      select: {
        books: {
          select: {
            name: true,
            cover: true,
          },
        },
        quantity: true,
        user_id: true,
        book_id: true,
        rent_to: true,
      },
    });

    return ctx.json({
      success: true,
      data: histories,
    });
  } catch (error) {
    console.error(error);
    return ctx.json(
      {
        success: false,
        message: "Failed to get histories",
      },
      500,
    );
  }
};

export default getHistories;
