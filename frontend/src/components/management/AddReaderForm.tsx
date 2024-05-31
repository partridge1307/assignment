"use client";

import { addReader, readerFormSchema } from "@/api/readers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const AddReaderForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof readerFormSchema>>({
    resolver: zodResolver(readerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: addReader,
    onSuccess: () => {
      toast({
        title: "Success",
        description:
          "Added a reader. Redirecting to readers list in 3 seconds...",
      });

      setTimeout(() => router.push("/manage/readers"), 1000 * 3);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(form: z.infer<typeof readerFormSchema>) {
    mutation.mutate(form);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-4 md:w-1/2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Your username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className={cn("w-full", {
            "opacity-50": mutation.isPending,
          })}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddReaderForm;
