import api from "@/lib/api";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  username: string;
  created_at: string;
  permission: 'admin' | 'user';
}

const userContext = createContext<User | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, status } = await api.get("/auth/session");
        if (status === 200) {
          setUser(data.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
        console.error("Error fetching user");
      }
    }

    fetchUser();
  }, [])

  return (
    <userContext.Provider value={user}>{children}</userContext.Provider>
  );
}

function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser }
