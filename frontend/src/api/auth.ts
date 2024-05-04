import api from "@/lib/api"
import { AxiosError } from "axios";
import { z } from "zod"

type User = {
  id: number;
  username: string;
  created_at: string;
  permission: 'admin' | 'user';
}

export const signInSchema = z.object({
  username: z.string().min(3).max(64),
  password: z.string().min(8).max(255),
})

export const signIn = async ({ username, password }: z.infer<typeof signInSchema>) => {
  try {
    const { data } = await api.post("/auth/sign-in", {
      username,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error("Invalid username or password");
      }
    }

    throw error;
  }
}

export const signUpSchema = z.object({
  username: z.string().min(3).max(64),
  password: z.string().min(8).max(255),
  confirmPassword: z.string().min(8).max(255)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signUp = async ({ username, password }: z.infer<typeof signUpSchema>) => {
  try {
    const { data } = await api.post("/auth/sign-up", {
      username,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error("Invalid username or password");
      }

      if (error.response?.status === 409) {
        throw new Error("Username already exists");
      }
    }

    throw error;
  }
}

export async function asyncGetUser() {
  const cookies = (await import("next/headers")).cookies;

  const authToken = cookies().get("accessToken")?.value;

  try {
    const { data } = await api.get("/auth/session", {
      headers: {
        cookie: `accessToken=${authToken}`,
      }
    });
    return data.data as User;
  } catch (error) {
    return null;
  }
}
