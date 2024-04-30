import addBook from "@/controllers/books/addBook";
import getBook from "@/controllers/books/getBook";
import getBooks from "@/controllers/books/getBooks";
import { requireAdmin } from "@/middlewares/auth";
import { Hono } from "hono";

const books = new Hono();

books.post("/", requireAdmin, addBook);
books.get("/", getBooks);
books.get("/:id", getBook);

export default books;
