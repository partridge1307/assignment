import { books, type newBook } from "$/db/schema/books";
import db from "@/config/db";
import logger from "@/config/logger";
import client from "@/config/model";
import type { HonoContext } from "@/types/hono";
import { DatabaseError } from "pg";
import { z } from "zod";
import { zfd } from "zod-form-data";

const bookSchema = zfd.formData({
  cover: zfd.file(),
  name: zfd.text(),
  author_id: zfd.numeric(),
  description: zfd.text(),
  pages: zfd.numeric(),
  price: zfd.numeric(),
  on_sale: zfd.checkbox(),
});

const addBook = async (ctx: HonoContext) => {
  try {
    const { cover, name, author_id, description, pages, price, on_sale } = bookSchema.parse(await ctx.req.formData());

    // Upload the cover to the discord
    const formData = new FormData();
    formData.append("file", cover);
    const res = await fetch(Bun.env.WH__URL!, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload the cover");
    // @ts-ignore
    const url = (await res.json()).attachments[0].proxy_url;

    const newBook: newBook = {
      cover: url,
      name,
      price,
      pages,
      description,
      author_id,
      on_sale,
    }

    const book = await db.insert(books).values(newBook).returning();

    return ctx.json({
      success: true,
      data: book,
    }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json({
        success: false,
        message: error.message,
      }, 400);
    }

    if (error instanceof DatabaseError) {
      if (error.code === "23503") {
        return ctx.json({
          success: false,
          message: "Author not found",
        }, 404);
      }

      if (error.code === "23505") {
        return ctx.json({
          success: false,
          message: "Book already exists",
        }, 409);
      }
    }

    logger.error(error);

    return ctx.json({
      success: false,
      message: "Internal Server Error",
    }, 500);

  }
};

export default addBook;
