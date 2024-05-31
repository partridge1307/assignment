import prisma from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { Prisma } from "@prisma/client";

const addToHistories = async (ctx: HonoContext) => {
  const { id } = ctx.get("user");

  try {
    const products = await prisma.carts.findMany({
      where: {
        user_id: id,
      },
    });

    if (!products.length) {
      return ctx.json(
        {
          success: false,
          message: "Book not found in cart",
        },
        404,
      );
    }

    const newHistories = products.map((cart) => {
      return {
        user_id: id,
        book_id: cart.book_id,
        quantity: cart.quantity,
        rent_to: cart.rent_to,
      };
    });

    const history = await prisma.histories.createMany({
      data: newHistories,
      skipDuplicates: true,
    });
    await prisma.carts.deleteMany({
      where: {
        user_id: id,
      },
    });
    await prisma.books.update({
      where: {
        id: products[0].book_id,
      },
      data: {
        sold: {
          increment: newHistories.length,
        },
      },
    });

    return ctx.json(
      {
        success: true,
        data: history,
      },
      201,
    );
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return ctx.json(
          {
            success: false,
            message: "Already purchased the book",
          },
          404,
        );
      }
    }

    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "Failed to add to histories",
      },
      500,
    );
  }
};

export default addToHistories;
