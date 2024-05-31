import addBook from "@/controllers/books/addBook";
import editBook from "@/controllers/books/editBook";
import getBook from "@/controllers/books/getBook";
import getBookByAuthor from "@/controllers/books/getBookByAuthor";
import getBookByTag from "@/controllers/books/getBookByTag";
import getBooks from "@/controllers/books/getBooks";
import getRandomBooks from "@/controllers/books/getRandomBooks";
import searchBooks from "@/controllers/books/searchBooks";
import { requireAdmin } from "@/middlewares/auth";
import { Hono } from "hono";

const books = new Hono();

books.get("/", getBooks);
books.post("/", requireAdmin, addBook);
books.get("/random", getRandomBooks);
books.get("/search", searchBooks);
books.post("/edit/:id", requireAdmin, editBook);
books.get("/by-author/:id", getBookByAuthor);
books.get("/by-tag", getBookByTag);
books.get("/:id", getBook);

export default books;
