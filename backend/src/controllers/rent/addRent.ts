import prisma from "@/config/db";
import type { Context } from "hono";
import { z } from "zod";

const RentSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
  quantity: z.number(),
  rent_to: z
    .string()
    .datetime()
    .refine((value) => new Date(value).getTime() - Date.now() > 10000),
});

const addRent = async (ctx: Context) => {
  try {
    const { user_id, book_id, quantity, rent_to } = RentSchema.parse(
      await ctx.req.json(),
    );

    const newRent = await prisma.histories.create({
      data: {
        user_id,
        book_id,
        quantity,
        rent_to,
      },
    });

    return ctx.json({
      success: true,
      data: newRent,
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

export default addRent;
