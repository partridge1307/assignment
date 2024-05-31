import type { Context } from "hono";
import logger from "@/config/logger";
import { verifyToken } from "@/lib/auth";
import { deleteCookie, getCookie } from "hono/cookie";
import prisma from "@/config/db";

const signOut = async (ctx: Context) => {
  const accessToken = getCookie(ctx, "accessToken");
  const refreshToken = getCookie(ctx, "refreshToken");

  if (!accessToken || !refreshToken)
    return ctx.json(
      {
        success: false,
        message: "Invalid token",
      },
      401,
    );

  try {
    verifyToken("ACCESS", accessToken);
    const decoded = verifyToken("REFRESH", refreshToken);
    const userId = Number(decoded.id);

    await prisma.sessions.delete({
      where: {
        user_id_token: {
          user_id: userId,
          token: refreshToken,
        },
      },
    });

    deleteCookie(ctx, "accessToken");
    deleteCookie(ctx, "refreshToken");

    return ctx.json(
      {
        success: true,
        message: "Successfully signed out",
      },
      200,
    );
  } catch (error) {
    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "Invalid token",
      },
      401,
    );
  }
};

export default signOut;
