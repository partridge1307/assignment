import { asyncGetUser } from "@/api/auth";
import { getHistories } from "@/api/histories";
import DeleteHistoryButton from "@/components/book/DeleteHistoryButton";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const App = async () => {
  const user = await asyncGetUser();
  if (!user) return redirect("/sign-in");
  const histories = await getHistories();

  return (
    <>
      <h1 className="uppercase text-4xl">Rented books</h1>
      {!histories?.length && <p>No rented books</p>}
      <ul className="grid grid-cols-2 gap-6">
        {histories?.map((history) => (
          <div key={history.book_id} className="relative">
            <Link
              href={`/books/${history.book_id}`}
              className="flex flex-nowrap space-x-4 bg-gradient-to-br dark:from-zinc-900 rounded-lg hover:bg-zinc-900 transition duration-500"
            >
              <div className="relative aspect-[3/4] basis-1/3 md:basis-1/4">
                <Image
                  priority
                  fill
                  src={history.books.cover}
                  alt="Book cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-xl md:text-2xl font-bold">
                  {history.books.name}
                </h3>
                <p>Books for rent: {history.quantity}</p>
                <time dateTime={history.rent_to}>
                  Rent to {new Date(history.rent_to).toDateString()}
                </time>
              </div>
            </Link>
            <DeleteHistoryButton book_id={history.book_id} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default App;
