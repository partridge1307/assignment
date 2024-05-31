import prisma from "@/config/db";
import { verifyToken } from "@/lib/auth";
import type { HonoContext } from "@/types/hono";
import { permissions } from "@prisma/client";
import type { Next } from "hono";
import { getCookie } from "hono/cookie";

const requireLogin = async (ctx: HonoContext, next: Next) => {
  const accessToken = getCookie(ctx, "accessToken");

  if (!accessToken) {
    return ctx.json(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }

  try {
    const decoded = verifyToken("ACCESS", accessToken);

    const user = await prisma.users.findFirst({
      where: {
        id: decoded.id as number,
      },
    });
    if (!user)
      return ctx.json(
        {
          success: false,
          message: "User not found",
        },
        404,
      );

    ctx.set("user", {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    });

    await next();
  } catch (error) {
    return ctx.json(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }
};

const requireAdmin = async (ctx: HonoContext, next: Next) => {
  const accessToken = getCookie(ctx, "accessToken");

  if (!accessToken) {
    return ctx.json(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }

  try {
    const decoded = verifyToken("ACCESS", accessToken);

    const user = await prisma.users.findFirst({
      where: {
        id: decoded.id as number,
        permission: permissions.admin,
      },
    });

    if (!user)
      return ctx.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401,
      );

    ctx.set("user", {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    });

    await next();
  } catch (error) {
    return ctx.json(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }
};

export { requireLogin, requireAdmin };
