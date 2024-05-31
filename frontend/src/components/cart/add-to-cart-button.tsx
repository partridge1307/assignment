"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartAPI } from "@/api/carts";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";

const addToCart = ({
  bookId,
  isLoggedIn,
}: {
  bookId: number;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: addToCartAPI,
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: "Failed to add to cart",
          description: error.response?.data.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Failed to add to cart",
        description: "An error occurred",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-count"],
      });
      router.refresh();
    },
  });

  function onClickHandler() {
    if (!isLoggedIn) return router.push("/sign-in");
    mutation.mutate(bookId);
  }

  return (
    <Button
      disabled={mutation.isPending}
      onClick={onClickHandler}
      className={mutation.isPending ? "opacity-50" : undefined}
    >
      Rent
    </Button>
  );
};

export default addToCart;
