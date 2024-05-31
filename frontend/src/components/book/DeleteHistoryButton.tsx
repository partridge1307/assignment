"use client";

import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DeleteHistoryButton = ({ book_id }: { book_id: number }) => {
  const { refresh } = useRouter();

  const mutation = useMutation({
    mutationFn: async (book_id: number) => {
      const { data } = await api.delete(`/histories/${book_id}`);

      return data;
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "OK",
      });

      refresh();
    },
  });

  return (
    <Button
      variant={"destructive"}
      disabled={mutation.isPending}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        mutation.mutate(book_id);
      }}
      className="absolute right-0 bottom-0"
    >
      Delete
    </Button>
  );
};

export default DeleteHistoryButton;
