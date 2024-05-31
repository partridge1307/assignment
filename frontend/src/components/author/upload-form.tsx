"use client"

import { uploadAuthor, authorSchema } from "@/api/author"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const UploadBookForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof authorSchema>>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: ""
    }
  })

  const mutation = useMutation({
    mutationFn: uploadAuthor,
    onSuccess: () => {
      form.reset();
      router.push('/')
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        title: "Error",
        value: error.response?.data.message || "An error occurred",
        variant: 'destructive'
      })
    }
  })


  return <Form {...form}><form onSubmit={form.handleSubmit((f) => mutation.mutate(f))}>
    <FormField control={form.control} name="name" render={({ field }) =>
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type='text' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <Button disabled={mutation.isPending} type="submit" className="w-full">Upload</Button>
  </form></Form>
}

export default UploadBookForm;
