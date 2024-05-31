import prisma from "@/config/db";
import type { Context } from "hono";
import { z } from "zod";

const readerFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const editUser = async (ctx: Context) => {
  try {
    const id = ctx.req.param("id");
    const { username, password } = readerFormSchema.parse(await ctx.req.json());

    const editedUser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        password: await Bun.password.hash(password),
      },
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });

    return ctx.json({
      success: true,
      data: editedUser,
    });
  } catch (error) {
    return ctx.json(
      {
        success: false,
        message: "Something went wrong",
      },
      500,
    );
  }
};

export default editUser;
