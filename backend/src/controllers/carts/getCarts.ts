import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";

const getCarts = async (ctx: HonoContext) => {
  const { id } = ctx.get('user')

  try {
    const carts = await db.query.carts.findMany({
      where: (carts, { eq }) => eq(carts.user_id, id)
    })

    return ctx.json({
      success: true,
      data: carts
    })
  } catch (error) {
    logger.error(error)
    return ctx.json({
      success: false,
      message: 'Failed to get carts'
    }, 500)
  }
}

export default getCarts;
