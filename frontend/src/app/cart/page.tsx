import { asyncGetUser } from "@/api/auth";
import { getCarts } from "@/api/carts";
import CalendarButton from "@/components/cart/calendar-button";
import DeleteItemButton from "@/components/cart/delete-item-button";
import PayButton from "@/components/cart/pay-button";
import QuantityButton from "@/components/cart/quantity-button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Cart = async () => {
  const user = await asyncGetUser();
  if (!user) return redirect("/sign-in");

  const carts = await getCarts();

  return (
    <>
      <section className="py-2">
        {!carts.length && (
          <p className="text-center">Your pending rent is empty</p>
        )}

        {!!carts.length && (
          <ul>
            {carts.map((item) => (
              <li key={item.book_id} className="flex gap-x-4">
                <Link
                  href={`/books/${item.book_id}`}
                  className="block relative aspect-[3/4] basis-1/3 md:basis-1/5 dark:bg-zinc-800 rounded-lg"
                >
                  <Image
                    priority
                    fill
                    src={item.books.cover}
                    alt={`${item.books.name}'s cover'`}
                    className="rounded-lg"
                  />
                </Link>
                <div className="space-y-4">
                  <Link href={`/books/${item.book_id}`}>
                    <h3 className="text-xl font-bold">{item.books.name}</h3>
                  </Link>
                  <QuantityButton
                    bookId={item.book_id}
                    initialQuantity={item.quantity}
                    initialDate={item.rent_to}
                  />
                  <CalendarButton
                    initalDate={item.rent_to}
                    bookId={item.book_id}
                    initalQuantity={item.quantity}
                  />
                  <DeleteItemButton bookId={item.book_id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <PayButton />
      </section>
    </>
  );
};

export default Cart;
