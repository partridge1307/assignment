import prisma from "@/config/db";
import { verifyToken } from "@/lib/auth";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";

const session = async (ctx: Context) => {
  const authToken = getCookie(ctx, "accessToken");
  if (!authToken) {
    return ctx.json({ success: false, message: "No session" }, 401);
  }

  try {
    const decoded = verifyToken("ACCESS", authToken);

    const user = await prisma.users.findFirst({
      where: {
        id: decoded.id as number,
      },
      select: {
        id: true,
        username: true,
        created_at: true,
        permission: true,
      },
    });

    return ctx.json({ success: true, data: user });
  } catch (error) {
    return ctx.json({ success: false, message: "Invalid session" }, 401);
  }
};

export default session;
