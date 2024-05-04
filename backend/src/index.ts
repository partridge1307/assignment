import { Hono } from "hono";
import { logger } from "hono/logger";
import { apiLogger } from "./config/logger";
import { cors } from "hono/cors";
import { errorHanlder, notFound } from "./middlewares";
import "@/config/db";

const app = new Hono().basePath("/api/v1");

// Global middlewares
app.use("*", cors({
  origin: "http://localhost:3000",
  allowMethods: ['GET', "POST", "PUT", "DELETE", "OPTION"],
  allowHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
  credentials: true,
}));
Bun.env.NODE_ENV !== "production" && app.use("*", logger(apiLogger));

// Routes
app.route("/auth", (await import("./routes/auth")).default);
app.route("/books", (await import("./routes/books")).default);
app.route("/authors", (await import("./routes/authors")).default);
app.route("/carts", (await import("./routes/carts")).default);
app.route("/histories", (await import("./routes/histories")).default);
app.route("/recommendations", (await import("./routes/recommendations")).default);

// Error handling
app.onError((_, c) => {
  const error = errorHanlder(c);
  return error
});

app.notFound((c) => {
  const error = notFound(c);
  return error;
});

const port = process.env.PORT || 8000;

export default {
  port,
  fetch: app.fetch,
  request: app.request,
};
