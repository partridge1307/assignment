"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { signUpSchema, signUp } from "@/api/auth"
import { cn } from "@/lib/utils"
import { useToast } from "../ui/use-toast"

function signInForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  })

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: () => {
      toast({
        title: "Sign up failed",
        description: "Bo may gay",
        variant: "destructive"
      })
    }
  })

  function onSubmit(form: z.infer<typeof signUpSchema>) {
    mutation.mutate(form)
  }


  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-4 md:w-1/2">
      <FormField control={form.control} name="username" render={({ field }) =>
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="partridge" {...field} />
          </FormControl>
        </FormItem>
      } />

      <FormField control={form.control} name="password" render={({ field }) =>
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="your mom" {...field} />
          </FormControl>
        </FormItem>
      } />

      <FormField control={form.control} name="confirmPassword" render={({ field }) =>
        <FormItem>
          <FormLabel>Confirm password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="your dad" {...field} />
          </FormControl>
        </FormItem>
      } />

      <Button type="submit" disabled={mutation.isPending} className={cn("w-full", {
        "opacity-50": mutation.isPending
      })}>Sign up</Button>
    </form>
  </Form>
}

export default signInForm;
