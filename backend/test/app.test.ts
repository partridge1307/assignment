import { describe, test, expect } from "bun:test"
import app from "@/index"

describe("First test", () => {
  test("/GET /", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  })
})
