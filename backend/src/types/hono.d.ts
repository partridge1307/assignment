import type { Users } from "$/db/schema/users";
import type { Context } from "hono";

type Variables = {
  user: Pick<Users, "id" | "username" | "created_at">
}

export type HonoContext = Context<{ Variables: Variables }>;
