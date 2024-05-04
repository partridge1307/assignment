import api from "@/lib/api"
import { Book } from "./books";

export const recommendationsToUser = async () => {
  try {
    const { data } = await api.get('/recommendations');
    return data.data as Book[];
  } catch (error) {
    throw error;
  }
}
