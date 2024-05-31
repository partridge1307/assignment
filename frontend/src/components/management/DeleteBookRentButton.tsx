"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import api from "@/lib/api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const DeleteBookRentButton = ({
  user_id,
  book_id,
}: {
  user_id: number;
  book_id: number;
}) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return await api.delete("/rent", {
        data: {
          user_id,
          book_id,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "OK",
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      variant={"destructive"}
      onClick={() => mutation.mutate()}
    >
      Delete
    </Button>
  );
};

export default DeleteBookRentButton;
