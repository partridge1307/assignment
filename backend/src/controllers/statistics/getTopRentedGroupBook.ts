import prisma from "@/config/db";
import type { Context } from "hono";

const getTopRentedGroupByBook = async (ctx: Context) => {
  try {
    const groupRented = await prisma.histories.groupBy({
      by: ["book_id"],
      _sum: {
        quantity: true,
      },
    });

    return ctx.json({
      success: true,
      data: groupRented,
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

export default getTopRentedGroupByBook;
