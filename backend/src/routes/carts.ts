import { addToCart } from "@/controllers/carts";
import deleteFromCart from "@/controllers/carts/deleteFromCart";
import getCarts from "@/controllers/carts/getCarts";
import updateCart from "@/controllers/carts/updateCart";
import { requireLogin } from "@/middlewares/auth";
import { Hono } from "hono";

const carts = new Hono();

carts.get("/", requireLogin, getCarts)
carts.post("/", requireLogin, addToCart)
carts.patch("/", requireLogin, updateCart)
carts.delete("/", requireLogin, deleteFromCart)

export default carts;
