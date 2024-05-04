'use client'

import api from "@/lib/api";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

const SignOut = forwardRef<ElementRef<"button">, ComponentPropsWithoutRef<"button">>(
  ({ className, children }, ref) => {
    const { toast } = useToast();

    async function signOut(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      e.stopPropagation();

      try {
        await api.post("/auth/sign-out");
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Sign out failed",
            description: error.message,
            variant: "destructive"
          })
        }

        console.error(error);
      }
    }

    return <Button
      ref={ref}
      variant={'destructive'}
      className={cn("w-full", className)}
      onClick={signOut}
    >
      {children}
    </Button>
  })

export default SignOut;
