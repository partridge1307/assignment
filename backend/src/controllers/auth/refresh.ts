import type { Context } from "hono";
import { generateToken, verifyToken } from "@/lib/auth";
import { getCookie, setCookie } from "hono/cookie";
import logger from "@/config/logger";
import prisma from "@/config/db";

const refresh = async (ctx: Context) => {
  const refreshToken = getCookie(ctx, "refreshToken");

  if (!refreshToken)
    return ctx.json(
      {
        success: false,
        message: "Invalid token",
      },
      401,
    );

  try {
    const decoded = verifyToken("REFRESH", refreshToken);
    const userId = Number(decoded.id);

    const userSessions = await prisma.sessions.findMany({
      where: {
        user_id: userId,
      },
    });

    if (userSessions.some((session) => session.token !== refreshToken)) {
      await prisma.sessions.deleteMany({
        where: {
          user_id: userId,
        },
      });

      return ctx.json(
        {
          success: false,
          message: "Invalid refresh token",
        },
        401,
      );
    }

    const newAccessToken = generateToken("ACCESS", { id: userId }, "15m");
    const newRefreshToken = generateToken("REFRESH", { id: userId }, "7d");

    await prisma.$transaction([
      prisma.sessions.deleteMany({
        where: {
          user_id: userId,
        },
      }),
      prisma.sessions.create({
        data: {
          user_id: userId,
          token: newRefreshToken,
        },
      }),
    ]);

    setCookie(ctx, "refreshToken", newRefreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    setCookie(ctx, "accessToken", newAccessToken, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return ctx.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    logger.error(error);

    return ctx.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      500,
    );
  }
};

export default refresh;
