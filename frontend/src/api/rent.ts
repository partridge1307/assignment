import api from "@/lib/api";
import { z } from "zod";

export const RentSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
  quantity: z.number(),
});

export const addRent = async (value: z.infer<typeof RentSchema>) => {
  const { data } = await api.post("/rent", value);

  return data;
};

export const getUserBooksRent = async (user_id: string) => {
  const cookies = (await import("next/headers")).cookies;

  try {
    const { data } = await api.get(`/rent/${user_id}`, {
      headers: {
        cookie: `accessToken=${cookies().get("accessToken")?.value}`,
      },
    });

    return data.data as Array<{
      book_id: number;
      books: { cover: string; name: string };
      quantity: number;
    }>;
  } catch (error) {
    return null;
  }
};
