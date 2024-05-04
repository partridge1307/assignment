"use client"

import { bookSchema, uploadBook } from "@/api/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const UploadBookForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      cover: "",
      name: "",
      author_id: undefined,
      price: '0',
      pages: '0',
      on_sale: false,
    }
  })

  const mutation = useMutation({
    mutationFn: uploadBook,
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
    <FormField control={form.control} name="cover" render={({ field }) =>
      <FormItem>
        <FormLabel>Cover</FormLabel>
        <FormControl>
          <Input type='file' ref={field.ref} onChange={(e) => {
            field.onChange(URL.createObjectURL(e.target.files!.item(0)!))
          }} onBlur={field.onBlur} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="name" render={({ field }) =>
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type='text' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="description" render={({ field }) =>
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="pages" render={({ field }) =>
      <FormItem>
        <FormLabel>Pages</FormLabel>
        <FormControl>
          <Input type="number" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="price" render={({ field }) =>
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input type="number" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="author_id" render={({ field }) =>
      <FormItem>
        <FormLabel>Author</FormLabel>
        <FormControl>
          <Input type="number" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <FormField control={form.control} name="on_sale" render={({ field }) =>
      <FormItem className="my-4 flex items-center gap-x-2">
        <FormLabel className="flex-shrink-0">Is on sale?</FormLabel>
        <FormControl className="w-fit h-fit">
          <Input
            type="checkbox"
            ref={field.ref}
            onChange={(e) => {
              if (e.target.checked) {
                form.setValue('on_sale', true)
              } else form.setValue('on_sale', false)
            }}
            onBlur={field.onBlur}
            disabled={field.disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    } />

    <Button disabled={mutation.isPending} type="submit" className="w-full">Upload</Button>
  </form></Form>
}

export default UploadBookForm;
