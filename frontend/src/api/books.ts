import api from "@/lib/api";
import { z } from "zod";

export enum BookTag {
  FICTION,
  NON_FICTION,
  ROMANCE,
  MYSTERY,
  FANTASY,
  SCIENCE_FICTION,
  HORROR,
  THRILLER,
  HISTORY,
  BIOGRAPHY,
}

export type Book = {
  id: number;
  name: string;
  cover: string;
  sold: number;
  description: string;
  author_id: number;
  pages: number;
  created_at: string;
  position: string;
  tags: BookTag[];
  authors: {
    id: number;
    name: string;
    created_at: string;
  };
};

export async function getBooks() {
  try {
    const { data } = await api.get("/books");

    return data.data as Pick<Book, "id" | "name" | "cover" | "sold">[];
  } catch (error) {
    return null;
  }
}

export type RandomBook = Pick<Book, "id" | "name" | "cover">;

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
  position: z.string(),
  tags: z.array(z.string()),
});

export async function uploadBook(data: z.infer<typeof bookSchema>) {
  const formData = new FormData();
  const buffer = await fetch(data.cover).then((res) => res.arrayBuffer());
  const blob = new Blob([buffer], { type: "image/png" });
  formData.append("cover", blob, "image");
  formData.append("name", data.name);
  formData.append("author_id", data.author_id);
  formData.append("description", data.description);
  formData.append("pages", data.pages);
  formData.append("position", data.position);

  for (const tag of data.tags) {
    formData.append("tags", tag.toString());
  }

  try {
    const { data } = await api.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data as Book;
  } catch (error) {
    throw error;
  }
}

export async function editBook({
  data,
  id,
}: {
  data: z.infer<typeof bookSchema>;
  id: number;
}) {
  const formData = new FormData();
  if (data.cover.startsWith("https://media.discordapp")) {
    formData.append("cover", data.cover);
  } else {
    const buffer = await fetch(data.cover).then((res) => res.arrayBuffer());
    const blob = new Blob([buffer], { type: "image/png" });
    formData.append("cover", blob, "image");
  }
  formData.append("name", data.name);
  formData.append("author_id", data.author_id);
  formData.append("description", data.description);
  formData.append("pages", data.pages);
  formData.append("position", data.position);

  for (const tag of data.tags) {
    formData.append("tags", tag.toString());
  }

  try {
    const { data } = await api.post(`/books/edit/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data as Book;
  } catch (error) {
    throw error;
  }
}

export async function searchBooks(query: string) {
  try {
    const { data } = await api.get(`/books/search?query=${query}`);

    return data.data as Book[];
  } catch (error) {
    return null;
  }
}

export async function getBookByAuthor(author_id: string) {
  try {
    const { data } = await api.get(`/books/by-author/${author_id}`);

    return data.data as Book[];
  } catch (error) {
    return null;
  }
}

export async function getBookByTag(tag: string) {
  try {
    const { data } = await api.get(`/books/by-tag?tag=${tag}`);

    return data.data as Book[];
  } catch (error) {
    return null;
  }
}
