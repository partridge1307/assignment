'use client'

import { useState } from "react"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateCart } from "@/api/carts";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { usePrevious } from "@/hooks/usePrevious";

const QuantityButton = ({ initialQuantity, bookId }: { initialQuantity: number, bookId: number }) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(initialQuantity);
  const previousQuantity = usePrevious(quantity);

  const mutation = useMutation({
    mutationFn: updateCart,
    onError: (error) => {
      !!previousQuantity && setQuantity(previousQuantity)

      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data.message,
          variant: 'destructive'
        })
        return;
      }

      toast({
        title: 'Error',
        description: 'An error occurred',
        variant: 'destructive'
      })
    },
    onMutate: (payload) => {
      setQuantity(payload.quantity)
    },
  })

  return <div className="space-x-4">
    <Button
      disabled={quantity <= 1 || mutation.isPending}
      size={'sm'}
      variant={'ghost'}
      onClick={() => mutation.mutate({
        bookId,
        quantity: quantity - 1
      })}
    >-</Button>
    <span>{quantity}</span>
    <Button
      disabled={mutation.isPending}
      size={'sm'}
      variant={'ghost'}
      onClick={() => mutation.mutate({
        bookId,
        quantity: quantity + 1
      })}
    >+</Button>
  </div >
}

export default QuantityButton
