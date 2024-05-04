import addAuthor from "@/controllers/authors/addAuthor";
import getAuthor from "@/controllers/authors/getAuthor";
import updateAuthor from "@/controllers/authors/updateAuthor";
import { requireAdmin } from "@/middlewares/auth";
import { Hono } from "hono";

const authors = new Hono();

authors.get("/", getAuthor);
authors.post("/", requireAdmin, addAuthor);
authors.put("/", requireAdmin, updateAuthor);

export default authors;
