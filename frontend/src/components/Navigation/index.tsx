"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import LogoImage from "$/logo.png";
import Image from "next/image";
import UserDropDown from "@/components/auth/user-dropdown";
import { useCart } from "@/components/cart/provider";
import { ShoppingCart } from "lucide-react";
import Search from "@/components/Search";
import { useUser } from "../auth/user-prodiver";
import Readers from "./Readers";
import Books from "./Books";
import Statistics from "./Statistics";

function Navbar() {
  const cart = useCart();
  const user = useUser();

  return (
    <NavigationMenu
      className="fixed top-0 min-w-full border
    dark:border-b-white backdrop-blur"
    >
      <NavigationMenuList className="min-w-[100dvw] md:min-w-[98dvw] justify-between">
        <div className="flex items-center space-x-4">
          {/* left */}
          <Link href="/">
            <Image priority width={70} height={70} src={LogoImage} alt="Logo" />
          </Link>
          <NavigationMenuItem>
            {/* General navigation */}
            <NavigationMenuTrigger className="bg-transparent ">
              Books
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                className="grid gap-3 p-6 md:w-[400px]
          lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
              >
                <div className="row-span-3">
                  <Link
                    className="flex h-full w-full select-none flex-col
              justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted
              p-6 no-underline outline-none focus:shadow-md"
                    href="/#new"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      New books
                    </div>
                    <p
                      className="text-sm leading-tight
                text-muted-foreground"
                    >
                      Get new products that are available in our library.{" "}
                    </p>
                  </Link>
                </div>
                <div>
                  <Link href="/#for-you" title="Recommend">
                    Recommended books
                  </Link>
                </div>
                <div>
                  <Link href="/histories" title="Histories">
                    Your renting books
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Admin only */}
          {!!user && user.permission === "admin" && (
            <>
              <Readers />
              <Books />
              <Statistics />
            </>
          )}
        </div>

        {/* right*/}
        <NavigationMenuItem className="flex items-center gap-x-4">
          <Search />
          <Link href={`/cart`} className="relative">
            <ShoppingCart />
            {cart > 0 && (
              <span
                className="absolute -top-2 -right-2 text-xs
            rounded-full px-1 dark:text-black bg-primary"
              >
                {cart}
              </span>
            )}
          </Link>
          <UserDropDown />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
