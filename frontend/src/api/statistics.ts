import api from "@/lib/api";
import { History } from "./histories";

export const getTopRented = async () => {
  try {
    const { data } = await api.get("/statistics/top-rented");

    return data.data as { id: number; name: string; cover: string }[];
  } catch (error) {
    return null;
  }
};

export type GroupedBooks = {
  _sum: { quantity: number };
  book_id: number;
};

export const getMostRented = async () => {
  try {
    const { data } = await api.get("/statistics/top-rented-by-book");

    return data.data as GroupedBooks[];
  } catch (error) {
    return null;
  }
};

export const getOutstandingRent = async () => {
  try {
    const { data } = await api.get("/statistics/outstanding-rent");

    return data.data as History[];
  } catch (error) {
    return null;
  }
};
