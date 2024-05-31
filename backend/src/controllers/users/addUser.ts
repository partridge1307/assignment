import prisma from "@/config/db";
import logger from "@/config/logger";
import type { HonoContext } from "@/types/hono";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const readerFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const AddUser = async (ctx: HonoContext) => {
  try {
    const { username, password } = readerFormSchema.parse(await ctx.req.json());
    const hashedPassword = await Bun.password.hash(password);

    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
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

export default AddUser;
