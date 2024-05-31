"use client";

import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { usePrevious } from "@/hooks/usePrevious";
import { useMutation } from "@tanstack/react-query";
import { updateCart } from "@/api/carts";
import { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

const CalendarButton = ({
  initalDate,
  initalQuantity,
  bookId,
}: {
  initalDate: string;
  initalQuantity: number;
  bookId: number;
}) => {
  const [date, setDate] = useState(new Date(initalDate));
  const previousDate = usePrevious(date);

  const mutation = useMutation({
    mutationFn: updateCart,
    onError: (error) => {
      !!previousDate && setDate(previousDate);

      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    },
    onMutate: (payload) => {
      setDate(new Date(payload.rent_to));
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-4">
          <CalendarIcon /> {"To ->"} {date.toDateString()}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (!d) return;
            if (d.getTime() - Date.now() <= 10000) return;

            setDate(d);
            mutation.mutate({
              bookId,
              rent_to: d.toISOString(),
              quantity: initalQuantity,
            });
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarButton;
