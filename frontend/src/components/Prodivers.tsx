"use client"

import { UserProvider } from "./auth/user-prodiver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./cart/provider";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  </QueryClientProvider>
}

export default Providers;
