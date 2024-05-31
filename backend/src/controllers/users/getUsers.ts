import prisma from "@/config/db";
import type { Context } from "hono";

const getUsers = async (ctx: Context) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });

    return ctx.json({
      success: true,
      data: users,
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

export default getUsers;
