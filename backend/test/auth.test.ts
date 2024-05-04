import { describe, test, expect } from "bun:test"
import app from "@/index"

describe("/POST /api/v1/auth/sign-up", () => {
  test("new-or-existing-user", async () => {
    const res = await app.request("/api/v1/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password"
      }),
    })

    // Check if the response status is 201
    if (res.status === 201) {
      expect(await res.json()).toEqual({
        success: true,
        data: {
          id: expect.any(Number),
          username: "test",
          createdAt: expect.any(String),
        }
      });
    }

    // Check if the response status is 409
    if (res.status === 409) {
      expect(await res.json()).toEqual({
        success: false,
        message: "Username already exists",
      });
    }
  });

  test("invalid-user-data", async () => {
    const res = await app.request("/api/v1/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        luci: "test",
        me_may_beo: "password"
      }),
    });

    // Check if the response status is 400
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      success: false,
      message: expect.any(Array),
    });
  });
});

describe("/POST /api/v1/auth/sign-in", () => {
  test("correct-credentials", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "password"
      }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      data: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }
    });
  });

  test("incorrect-credentials", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "wrong_password"
      }),
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      success: false,
      message: "Invalid password",
    });
  });

  test("user-not-found", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "notFound",
        password: "password"
      }),
    });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      success: false,
      message: "User not found",
    });
  });

  test("invalid-user-data", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        luci: "test",
        me_may_beo: "password"
      }),
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      success: false,
      message: expect.any(Array),
    });

  });
})
