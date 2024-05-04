import api from "@/lib/api"
import { Book } from "./books";
import { cookies } from "next/headers";

export type History = {
  user_id: number;
  book_id: number;
  quantity: number;
  book: Pick<Book, "cover" | "name">
}

export async function getHistories() {
  const accessToken = cookies().get('accessToken')?.value

  try {
    const { data } = await api.get('/histories', {
      headers: {
        Cookie: `accessToken=${accessToken}`
      }
    })
    return data.data as History[]
  } catch (error) {
    console.error(error)
    return null
  }
}
