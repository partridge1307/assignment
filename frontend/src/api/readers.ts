import api from "@/lib/api";
import { z } from "zod";

export const readerFormSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const addReader = async (value: z.infer<typeof readerFormSchema>) => {
  const { data } = await api.post("/users/add", {
    username: value.username,
    password: value.password,
  });

  return data;
};

export const getReader = async (readerId: string) => {
  const cookies = (await import("next/headers")).cookies;

  try {
    const { data } = await api.get(`/users/${readerId}`, {
      headers: {
        cookie: `accessToken=${cookies().get("accessToken")?.value}`,
      },
    });

    return data.data as {
      id: number;
      username: string;
      created_at: string;
    };
  } catch (error) {
    return null;
  }
};

export const editReader = async ({
  value,
  id,
}: {
  value: z.infer<typeof readerFormSchema>;
  id: number;
}) => {
  const { data } = await api.post(`/users/edit/${id}`, {
    username: value.username,
    password: value.password,
  });

  return data;
};
