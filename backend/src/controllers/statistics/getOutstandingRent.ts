import prisma from "@/config/db";
import type { Context } from "hono";

const getOutstandingRent = async (ctx: Context) => {
  try {
    const outStandingRent = await prisma.histories.findMany({
      where: {
        rent_to: {
          lte: new Date(Date.now()),
        },
      },
      select: {
        book_id: true,
        user_id: true,
        quantity: true,
        rent_to: true,
        books: {
          select: {
            cover: true,
            name: true,
          },
        },
      },
    });

    return ctx.json({
      success: true,
      data: outStandingRent,
    });
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

export default getOutstandingRent;
