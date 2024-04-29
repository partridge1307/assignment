import { describe, test, expect } from "bun:test";
import app from "@/index";

describe("Books", () => {
  test("/POST /api/v1/books (Upload a book)", async () => {
    const userRes = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password",
      }),
    });

    expect(userRes.status).toBe(200);
    const { data } = await userRes.json() as any;

    const readSync = (await import("fs")).readFileSync;
    const buffer = readSync("test/assets/image.webp");
    const image = new Blob([buffer], { type: "image/webp" });
    const formData = new FormData();
    formData.append("cover", image, "image.webp");
    formData.append("name", "Book Name");
    formData.append("author_id", "1");
    formData.append("description", "Description");
    formData.append("pages", "100");
    formData.append("price", "100");
    formData.append("on_sale", "on");

    const bookRes = await app.request("/api/v1/books", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${data.accessToken}`,
      },
      body: formData,
    });

    if (bookRes.status === 201) {
      expect(await bookRes.json()).toEqual({
        success: true,
        data: {
          id: expect.any(Number),
          cover: expect.any(String),
          name: "Book Name",
          price: 100,
          pages: 100,
          description: "Description",
          author_id: 1,
          on_sale: true,
        },
      });
    }

    if (bookRes.status === 409) {
      expect(await bookRes.json()).toEqual({
        success: false,
        message: "Book already exists",
      });
    }
  })
})
