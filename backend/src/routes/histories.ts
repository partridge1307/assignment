import addToHistories from "@/controllers/histories/addToHistories";
import deleteHistory from "@/controllers/histories/deleteHistory";
import getHistories from "@/controllers/histories/getHistories";
import { requireLogin } from "@/middlewares/auth";
import { Hono } from "hono";

const histories = new Hono();

histories.get("/", requireLogin, getHistories);
histories.post("/", requireLogin, addToHistories);
histories.delete("/:id", requireLogin, deleteHistory);

export default histories;
