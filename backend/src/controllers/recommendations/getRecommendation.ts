import prisma from "@/config/db";
import type { HonoContext } from "@/types/hono";

const getRecommendation = async (ctx: HonoContext) => {
  try {
    const sqlRaw = prisma.$queryRaw`SELECT * FROM books ORDER BY random() LIMIT 10`;
    const recommendation = await sqlRaw;

    return ctx.json({
      success: true,
      data: recommendation,
    });
  } catch (error: any) {
    return ctx.json(
      {
        success: false,
        message: error.message,
      },
      500,
    );
  }
};

export default getRecommendation;
