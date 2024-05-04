import addBook from "@/controllers/books/addBook";
import getBook from "@/controllers/books/getBook";
import getBooks from "@/controllers/books/getBooks";
import getRandomBooks from "@/controllers/books/getRandomBooks";
import searchBooks from "@/controllers/books/searchBooks";
import { requireAdmin } from "@/middlewares/auth";
import { Hono } from "hono";

const books = new Hono();

books.get("/", getBooks);
books.get("/random", getRandomBooks);
books.get('/search', searchBooks);
books.get("/:id", getBook);
books.post("/", requireAdmin, addBook);

export default books;
