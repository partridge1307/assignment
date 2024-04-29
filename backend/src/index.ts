import { Hono } from "hono";
import "@/config/db"

const app = new Hono();

app.get("/", (c) => {
  return c.json({ "message": "ok" })
})

export default app;

