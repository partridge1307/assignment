"use client";

import { Book, BookTag, bookSchema, editBook } from "@/api/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const EditBookForm = ({ book }: { book: Book }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      cover: book.cover,
      name: book.name,
      author_id: book.author_id.toString(),
      pages: book.pages.toString(),
      position: book.position,
      description: book.description,
      tags: book.tags as unknown as string[],
    },
  });

  const mutation = useMutation({
    mutationFn: editBook,
    onSuccess: () => {
      form.reset();
      toast({
        title: "Success",
        value: "Edited Book. Redirecting to homepage...",
      });

      setTimeout(() => router.push("/"), 1000 * 3);
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        title: "Error",
        value: error.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const authorMutation = useMutation({
    mutationFn: async (value: string) => {
      const { data } = await api.get(`/authors?name=${value}`);

      return data.data as { id: number; name: string; created_at: string }[];
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((f) =>
          mutation.mutate({ data: f, id: book.id }),
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              {!!field.value && (
                <img src={field.value} className="rounded-lg" />
              )}
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  onChange={(e) => {
                    field.onChange(
                      URL.createObjectURL(e.target.files!.item(0)!),
                    );
                  }}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pages</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author {field.value}</FormLabel>
              <FormControl>
                <Command>
                  <CommandInput
                    placeholder="Author name"
                    onValueChange={(value) => {
                      if (!value) return;
                      authorMutation.mutate(value);
                    }}
                  />
                  <CommandList>
                    {!authorMutation.data?.length && (
                      <CommandEmpty>Not found</CommandEmpty>
                    )}
                    {!!authorMutation.data &&
                      authorMutation.data.map((author) => (
                        <CommandItem
                          key={author.id}
                          onSelect={() => {
                            field.onChange(author.id.toString());
                          }}
                          className="py-2 text-xl hover:cursor-pointer"
                        >
                          {author.name}
                        </CommandItem>
                      ))}
                  </CommandList>
                </Command>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormMessage />
              <FormControl>
                <ul className="flex items-center gap-2">
                  {Object.values(BookTag)
                    .filter((tag) => isNaN(tag as number))
                    .map((tag, index) => (
                      <li
                        key={index}
                        className={cn(
                          "rounded-full px-2 p-1 bg-sky-500 text-xs hover:cursor-pointer",
                          {
                            "bg-red-600": field.value.some((t) => t === tag),
                          },
                        )}
                        onClick={() => {
                          if (field.value.some((t) => t === tag)) {
                            const filteredTags = field.value.filter(
                              (t) => t !== tag,
                            );
                            field.onChange(filteredTags);
                            return;
                          }

                          field.value.push(tag as string);
                          field.onChange(field.value);
                        }}
                      >
                        {tag}
                      </li>
                    ))}
                </ul>
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={mutation.isPending} type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </Form>
  );
};

export default EditBookForm;
