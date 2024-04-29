import { Hono } from "hono";
import { logger } from "hono/logger";
import { apiLogger } from "./config/logger";
import { cors } from "hono/cors";
import { errorHanlder, notFound } from "./middlewares";
import "@/config/db";

const app = new Hono().basePath("/api/v1");

// Global middlewares
app.use("*", logger(apiLogger));
app.use("*", cors({ origin: "*", allowMethods: ['GET', "POST", "PUT", "DELETE", "OPTION"] }));

// Routes
app.route("/auth", (await import("./routes/auth")).default);

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
