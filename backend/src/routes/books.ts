import addBook from "@/controllers/books/addBook";
import requireLogin from "@/middlewares/auth";
import { Hono } from "hono";

const books = new Hono();

books.post("/", requireLogin, addBook);

export default books;
