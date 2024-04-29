import type { Context } from "hono";
import { z } from "zod";
import { userSchema } from "./sign-up";
import db from "@/config/db";
import { TokenEnum, generateToken } from "@/lib/auth";
import { sessions } from "$/db/schema/users";

const signIn = async (ctx: Context) => {
  try {
    const { username, password } = userSchema.parse(await ctx.req.json());

    const user = await db.query.users.findFirst({
      where: ((users, { eq }) => eq(users.username, username))
    })

    if (!user) return ctx.json({
      success: false,
      message: "User not found",
    }, 404);

    // Correct password
    if (!(await Bun.password.verify(password, user.password))) return ctx.json({
      success: false,
      message: "Invalid password",
    }, 401);

    // Generate tokens
    const accessToken = generateToken(TokenEnum.ACCESS as keyof typeof TokenEnum, { id: user.id }, "15m");
    const refreshToken = generateToken(TokenEnum.REFRESH as keyof typeof TokenEnum, { id: user.id }, "7d");

    await db.insert(sessions).values({
      user_id: user.id,
      token: refreshToken,
    })

    return ctx.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.errors,
      }, 400);
    }

    console.error(error);

    return ctx.json({
      success: false,
      message: "An error occurred while processing your request",
    }, 500);
  }
};

export default signIn;
