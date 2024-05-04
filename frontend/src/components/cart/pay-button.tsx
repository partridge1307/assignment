'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import api from "@/lib/api";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const PayButton = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async () => {

      await api.post('/histories')
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        title: 'Error',
        value: error.response?.data.message || 'An error occurred',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart-count']
      })
      router.refresh()
    }
  })

  return <Button disabled={mutation.isPending} className="w-full" onClick={() => mutation.mutate()}>Rent</Button>
}

export default PayButton;
