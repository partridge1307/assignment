"use client";

import { RentSchema, addRent } from "@/api/rent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import api from "@/lib/api";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AddRentForm = () => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null,
  );

  const form = useForm<z.infer<typeof RentSchema>>({
    resolver: zodResolver(RentSchema),
    defaultValues: {
      user_id: undefined,
      book_id: undefined,
      quantity: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: addRent,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Added rent",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((f) => mutation.mutate(f))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id - {field.value}</FormLabel>
              <FormControl>
                <Input
                  onChange={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!e.target.value) return;

                    try {
                      const { data } = await api.get(
                        `/users/name?query=${e.target.value}`,
                      );

                      setUser(data.data);
                    } catch (error) {
                      return;
                    }
                  }}
                />
              </FormControl>
              {!!user && (
                <dl
                  onClick={(e) => {
                    e.preventDefault();

                    field.onChange(user.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded p-2 bg-sky-500 hover:cursor-pointer",
                    {
                      "bg-red-500": field.value === user.id,
                    },
                  )}
                >
                  <dt>{user.id}</dt>
                  <dt>{user.username}</dt>
                </dl>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="book_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Id</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddRentForm;
