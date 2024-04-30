import signUp from "@/controllers/auth/sign-up";
import signIn from "@/controllers/auth/sign-in";
import refresh from "@/controllers/auth/refresh";
import signOut from "@/controllers/auth/sign-out";
import { Hono } from "hono";

const auth = new Hono();

auth.post("/sign-up", signUp);
auth.post("/sign-in", signIn);
auth.post("/refresh", refresh);
auth.post("/sign-out", signOut);

export default auth;
