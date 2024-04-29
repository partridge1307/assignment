import type { Context } from "hono";
import { sessions } from "$/db/schema/users";
import db from "@/config/db";
import logger from "@/config/logger";
import { verifyToken } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";

const signOut = async (ctx: Context) => {
  const accessToken = getCookie(ctx, "accessToken");
  const refreshToken = getCookie(ctx, "refreshToken");

  if (!accessToken || !refreshToken) return ctx.json({
    success: false,
    message: "Invalid token",
  }, 401);

  try {
    verifyToken("ACCESS", accessToken);
    const decoded = verifyToken("REFRESH", refreshToken);
    const userId = Number(decoded.id);

    // Delete the refresh token from the database
    await db.delete(sessions).where(and(
      eq(sessions.user_id, userId),
      eq(sessions.token, refreshToken),
    ));

    deleteCookie(ctx, "accessToken");
    deleteCookie(ctx, "refreshToken");

    return ctx.json({
      success: true,
      message: "Successfully signed out",
    }, 200);
  } catch (error) {
    logger.error(error);

    return ctx.json({
      success: false,
      message: "Invalid token",
    }, 401);
  }
}

export default signOut;
