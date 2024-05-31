import prisma from "@/config/db";
import logger from "@/config/logger";
import type { Context } from "hono";

const getUserByName = async (ctx: Context) => {
  try {
    const query = ctx.req.query("query");

    if (!query)
      return ctx.json(
        {
          success: false,
          message: "Null query",
        },
        409,
      );

    const user = await prisma.users.findFirst({
      where: {
        username: {
          contains: query,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return ctx.json({
      success: true,
      data: user,
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

export default getUserByName;
