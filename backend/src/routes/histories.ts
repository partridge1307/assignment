import addToHistories from "@/controllers/histories/addToHistories";
import getHistories from "@/controllers/histories/getHistories";
import { requireLogin } from "@/middlewares/auth";
import { Hono } from "hono";

const histories = new Hono();

histories.post("/", requireLogin, addToHistories);
histories.get("/", requireLogin, getHistories);

export default histories;
