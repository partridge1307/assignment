import { describe, test, expect } from "bun:test"
import app from "@/index"

describe("Sign up", () => {
  test("/POST /api/v1/auth/sign-up (New or existing user)", async () => {
    const res = await app.request("/api/v1/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        username: "test2",
        password: "password"
      }),
    })

    // Check if the response status is 201
    if (res.status === 201) {
      expect(await res.json()).toEqual({
        success: true,
        data: {
          id: expect.any(Number),
          username: "test2",
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

  test("/POST /api/v1/auth/sign-up (Invalid data)", async () => {
    const res = await app.request("/api/v1/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        luci: "test2",
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

describe("Sign in", () => {
  test("/POST /api/v1/auth/sign-in (Correct credentials)", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test2",
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

  test("/POST /api/v1/auth/sign-in (Incorrect credentials)", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: "test2",
        password: "wrong_password"
      }),
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      success: false,
      message: "Invalid password",
    });
  });

  test("/POST /api/v1/auth/sign-in (User not found)", async () => {
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

  test("/POST /api/v1/auth/sign-in (Invalid data)", async () => {
    const res = await app.request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        luci: "test2",
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
