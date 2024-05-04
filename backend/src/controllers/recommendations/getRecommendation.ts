import { books } from "$/db/schema/books";
import db from "@/config/db";
import type { HonoContext } from "@/types/hono";
import { sql } from "drizzle-orm";

const getRecommendation = async (ctx: HonoContext) => {
  try {
    const recommendation = await db.select().from(books).orderBy(sql`RANDOM()`).limit(10)

    return ctx.json({
      success: true,
      data: recommendation
    })
  } catch (error: any) {
    return ctx.json({
      success: false,
      message: error.message
    }, 500)
  }
}

export default getRecommendation;
