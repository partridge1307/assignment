import db from "@/config/db";
import { verifyToken } from "@/lib/auth";
import type { Context } from "hono";
import { getCookie, } from "hono/cookie";

const session = async (ctx: Context) => {
  const authToken = getCookie(ctx, 'accessToken')
  if (!authToken) {
    return ctx.json({ success: false, message: 'No session' }, 401)
  }

  try {
    const decoded = verifyToken("ACCESS", authToken)

    const user = await db.query.users.findFirst({
      where: ((users, { eq }) => eq(users.id, Number(decoded.id))),
      columns: {
        id: true,
        username: true,
        created_at: true,
        permission: true
      }
    })

    return ctx.json({ success: true, data: user })
  } catch (error) {
    return ctx.json({ success: false, message: 'Invalid session' }, 401)
  }
}

export default session
