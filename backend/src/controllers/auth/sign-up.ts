import type { Context } from "hono";
import { z } from "zod";
import logger from "@/config/logger";
import prisma from "@/config/db";
import { Prisma } from "@prisma/client";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Above 3 characters")
    .max(64, "Below 64 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters"),
  password: z
    .string()
    .min(8, "Above 8 characters")
    .max(255, "Below 255 characters"),
  phone_number: z.string(),
  address: z.string(),
});

const signUp = async (ctx: Context) => {
  try {
    const { username, password, phone_number, address } = userSchema.parse(
      await ctx.req.json(),
    );

    const newUser = {
      username,
      password: await Bun.password.hash(password),
      phone_number,
      address,
    };

    const user = await prisma.users.create({
      data: newUser,
    });

    return ctx.json(
      {
        success: true,
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.created_at,
        },
      },
      201,
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json(
        {
          success: false,
          message: error.errors,
        },
        400,
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return ctx.json(
          {
            success: false,
            message: "Username already exists",
          },
          409,
        );
      }
    }

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

export default signUp;
