import signUp from "@/controllers/auth/sign-up";
import signIn from "@/controllers/auth/sign-in";
import { Hono } from "hono";

const auth = new Hono();

auth.post("/sign-up", signUp);
auth.post("/sign-in", signIn);

export default auth;
