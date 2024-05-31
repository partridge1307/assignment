import addRent from "@/controllers/rent/addRent";
import deleteUserBookRent from "@/controllers/rent/deleteUserBookRent";
import userBooksRent from "@/controllers/rent/userBooksRent";
import { requireAdmin } from "@/middlewares/auth";
import { Hono } from "hono";

const rent = new Hono();

rent.post("/", requireAdmin, addRent);
rent.delete("/", requireAdmin, deleteUserBookRent);
rent.get("/:id", requireAdmin, userBooksRent);

export default rent;
