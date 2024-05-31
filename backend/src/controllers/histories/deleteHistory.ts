import prisma from "@/config/db";
import type { HonoContext } from "@/types/hono";

const deleteHistory = async (ctx: HonoContext) => {
  try {
    const book_id = Number(ctx.req.param("id"));
    const user = ctx.get("user");

    await prisma.histories.delete({
      where: {
        user_id_book_id: {
          user_id: user.id,
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
    console.log(error);
    return ctx.json(
      {
        success: false,
        message: "Something went wrong",
      },
      500,
    );
  }
};

export default deleteHistory;
