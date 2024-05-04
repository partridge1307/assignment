import { describe, test, expect } from "bun:test";
import app from "@/index";

describe("/POST /api/v1/authors", () => {
  test("add-a-author", async () => {
    const userRes = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password",
      }),
    });

    expect(userRes.status).toBe(200);
    const { data } = await userRes.json() as any;

    const res = await app.request("/api/v1/authors", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
      }),
      headers: {
        Cookie: `accessToken=${data.accessToken}`,
      }
    });

    if (res.status === 200) {
      expect(await res.json()).toEqual({
        data: {
          id: expect.any(Number),
          name: "John Doe",
          created_at: expect.any(String),
        }
      });
    }

    if (res.status === 400) {
      expect(await res.json()).toEqual({
        success: false,
        message: expect.any(String),
      });
    }
  });

  test("invalid-author-data", async () => {
    const userRes = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password",
      }),
    });

    expect(userRes.status).toBe(200);
    const { data } = await userRes.json() as any;

    const res = await app.request("/api/v1/authors", {
      method: "POST",
      body: JSON.stringify({
        name: "",
      }),
      headers: {
        Cookie: `accessToken=${data.accessToken}`,
      }
    })

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      success: false,
      message: "Author already exists"
    })
  })
});

describe("Get authors", () => {
  test("/GET /api/v1/authors", async () => {
    const res = await app.request(`/api/v1/authors?name=${encodeURIComponent("John Doe")}`)

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      data: [
        {
          id: expect.any(Number),
          name: "John Doe",
          created_at: expect.any(String),
        }
      ]
    });
  })
});

describe("Update author", () => {
  test("/PATCH /api/v1/authors (Update a author)", async () => {
    const userRes = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password",
      }),
    });

    expect(userRes.status).toBe(200);
    const { data } = await userRes.json() as any;
    const res = await app.request("/api/v1/authors", {
      method: "PATCH",
      body: JSON.stringify({
        id: 1,
        name: "Jane Doe",
      }),
      headers: {
        Cookie: `accessToken=${data.accessToken}`,
      }
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      data: [{
        id: 1,
        name: "Jane Doe",
        created_at: expect.any(String),
      }]
    })
  })

  test("/PATCH /api/v1/authors (Update non existing author)", async () => {
    const userRes = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password",
      }),
    });

    expect(userRes.status).toBe(200);
    const { data } = await userRes.json() as any;

    const res = await app.request("/api/v1/authors", {
      method: "PATCH",
      body: JSON.stringify({
        id: 2,
        name: "Jane Doe",
      }),
      headers: {
        Cookie: `accessToken=${data.accessToken}`,
      }
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      success: false,
      message: "Author already exists"
    })
  })
});
