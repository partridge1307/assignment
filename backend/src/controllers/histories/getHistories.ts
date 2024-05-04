import db from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";

const getHistories = async (ctx: HonoContext) => {
  const { id } = ctx.get('user')

  try {
    const histories = await db.query.histories.findMany({
      where: (histories, { eq }) => eq(histories.user_id, id),
      with: {
        book: {
          columns: {
            name: true,
            cover: true
          }
        }
      }
    })

    return ctx.json({
      success: true,
      data: histories
    })
  } catch (error) {
    console.error(error)
    return ctx.json({
      success: false,
      message: 'Failed to get histories'
    }, 500)
  }
}

export default getHistories;
