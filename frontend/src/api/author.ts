import api from "@/lib/api";
import { z } from "zod";

export type Author = {
  id: number;
  name: string;
  created_at: string;
};

export const authorSchema = z.object({
  name: z.string(),
});

export async function uploadAuthor(data: z.infer<typeof authorSchema>) {
  try {
    const resp = await api.post("/authors", data);
    return resp.data.data as Author;
  } catch (error) {
    throw error;
  }
}

export async function getAuthors() {
  try {
    const { data } = await api.get("/authors/all");

    return data.data as Author[];
  } catch (error) {
    return null;
  }
}
