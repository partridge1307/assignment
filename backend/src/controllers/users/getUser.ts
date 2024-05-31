import prisma from "@/config/db";
import type { Context } from "hono";

const getUser = async (ctx: Context) => {
  try {
    const reader_id = ctx.req.param("id");

    const reader = await prisma.users.findFirst({
      where: {
        id: Number(reader_id),
        NOT: {
          permission: "admin",
        },
      },
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });

    return ctx.json({
      success: true,
      data: reader,
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

export default getUser;
