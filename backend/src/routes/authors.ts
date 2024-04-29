import addAuthor from "@/controllers/authors/addAuthor";
import getAuthor from "@/controllers/authors/getAuthor";
import updateAuthor from "@/controllers/authors/updateAuthor";
import { Hono } from "hono";

const authors = new Hono();

authors.get("/", getAuthor);
authors.post("/", addAuthor);
authors.patch("/", updateAuthor);

export default authors;
