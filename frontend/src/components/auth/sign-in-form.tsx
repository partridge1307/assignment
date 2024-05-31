"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { signInSchema, signIn } from "@/api/auth";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

function signInForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: () => {
      toast({
        title: "Sign in failed",
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    },
  });

  function onSubmit(form: z.infer<typeof signInSchema>) {
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

        <Button
          type="submit"
          disabled={mutation.isPending}
          className={cn("w-full", {
            "opacity-50": mutation.isPending,
          })}
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}

export default signInForm;
