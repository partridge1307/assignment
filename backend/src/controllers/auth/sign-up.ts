import { users, type newUser } from "$/db/schema/users";
import type { Context } from "hono";
import db from "@/config/db";
import { z } from "zod";
import { DatabaseError } from "pg";
import logger from "@/config/logger";

export const userSchema = z.object({
  username: z.string().min(3, "Above 3 characters").max(64, "Below 64 characters").regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters"),
  password: z.string().min(8, "Above 8 characters").max(255, "Below 255 characters"),
})

const signUp = async (ctx: Context) => {
  try {
    const { username, password } = userSchema.parse(await ctx.req.json());

    const newUser: newUser = {
      username,
      password: await Bun.password.hash(password),
    };

    const user = await db.insert(users).values(newUser).returning();

    return ctx.json({
      success: true,
      data: {
        id: user.at(0)?.id,
        username: user.at(0)?.username,
        createdAt: user.at(0)?.created_at,
      }
    }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      }, 400);
    }

    if (error instanceof DatabaseError) {
      if (error.code === "23505") {
        return ctx.json({
          success: false,
          message: "Username already exists",
        }, 409);
      }
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: "An error occurred while processing your request",
    }, 500);
  }
};

export default signUp;
