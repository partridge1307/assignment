'use client'

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { getCartsQuantity } from "@/api/carts";

const cartContext = createContext<number>(0);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [inCart, setInCart] = useState<number>(0);

  const query = useQuery({
    queryKey: ['cart-count'],
    queryFn: getCartsQuantity,
  });

  useEffect(() => {
    setInCart(query.data || 0);
  }, [query.data])

  return <cartContext.Provider value={inCart}>{children}</cartContext.Provider>
}

export const useCart = () => {
  return useContext(cartContext);
}
