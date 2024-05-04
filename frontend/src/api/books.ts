import api from "@/lib/api";
import { z } from "zod";

export type Book = {
  id: number;
  name: string;
  cover: string;
  price: number;
  sold: number;
  on_sale: boolean;
  description: string;
  author_id: number;
  pages: number;
  created_at: string;
  author: {
    id: number;
    name: string;
    created_at: string;
  }
}

export async function getBooks() {
  try {
    const { data } = await api.get("/books");

    return data.data as Pick<Book, "id" | "name" | "cover" | "price" | "sold" | "on_sale">[];
  } catch (error) {
    return null;
  }
}

export type RandomBook = Pick<Book, "id" | "name" | "cover" | "price" | "on_sale">;

export async function getRandomBooks() {
  try {
    const { data } = await api.get("/books/random");

    return data.data as RandomBook[];
  } catch (error) {
    return null;
  }
}

export async function getBook(id: string) {
  try {
    const { data } = await api.get(`/books/${id}`);
    return data.data as Book;
  } catch (error) {
    return null;
  }
}

export const bookSchema = z.object({
  cover: z.string(),
  name: z.string(),
  author_id: z.string(),
  description: z.string(),
  pages: z.string(),
  price: z.string(),
  on_sale: z.boolean(),
})

export async function uploadBook(data: z.infer<typeof bookSchema>) {
  const formData = new FormData();
  const buffer = await fetch(data.cover).then((res) => res.arrayBuffer())
  const blob = new Blob([buffer], { type: "image/png" });
  formData.append("cover", blob, 'image');
  formData.append("name", data.name);
  formData.append("author_id", data.author_id);
  formData.append("description", data.description);
  formData.append("pages", data.pages);
  formData.append("price", data.price);
  formData.append("on_sale", data.on_sale ? 'on' : 'off');

  try {
    const { data } = await api.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    console.log(data);
    return data.data as Book;
  } catch (error) {
    throw error;
  }
}

export async function searchBooks(query: string) {
  try {
    const { data } = await api.get(`/books/search?query=${query}`);

    return data.data as Book[]
  } catch (error) {
    return null;
  }
}
