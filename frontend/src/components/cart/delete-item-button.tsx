'use client'

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "@/api/carts";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const DeleteItemButton = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-count"]
      })
      router.refresh()
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        title: 'Failed to delete item',
        value: error.response?.data.message,
        variant: 'destructive'
      })
    }
  })

  return <Button
    disabled={mutation.isPending}
    size={'sm'}
    variant={'destructive'}
    onClick={() => mutation.mutate(bookId)}
  ><Trash2 />
  </Button>
}

export default DeleteItemButton;
