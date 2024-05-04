import api from "@/lib/api"
import { Book } from "./books"

export const addToCart = async (bookId: number) => {
  try {
    await api.post("/carts", {
      bookId,
    })
  } catch (error) {
    throw error
  }
}

export const getCartsQuantity = async () => {
  try {
    const { data } = await api.get("/carts");
    return data.data.length;
  } catch (error) {
    throw error
  }
}

export type Cart = {
  user_id: number;
  book_id: number;
  quantity: number;
  books: Pick<Book, "cover" | "name">
}

export const getCarts = async () => {
  const cookies = (await import("next/headers")).cookies();

  try {
    const { data } = await api.get("/carts", {
      headers: {
        "Cookie": `accessToken=${cookies.get('accessToken')?.value}`
      }
    });
    return data.data as Cart[];
  } catch (error) {
    return []
  }
}

export const updateCart = async ({ bookId, quantity }: { bookId: number, quantity: number }) => {
  try {
    await api.put('/carts', {
      book_id: bookId,
      quantity
    })
  } catch (error) {
    throw error
  }
}

export const deleteCart = async (bookId: number) => {
  try {
    await api.delete(`/carts/${bookId}`)
  } catch (error) {
    throw error
  }
}

export const rentBooks = async () => {
  try {
    await api.post("/histories")
  } catch (error) {
    throw error
  }
}
