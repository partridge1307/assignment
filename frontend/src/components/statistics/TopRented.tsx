import { getTopRented } from "@/api/statistics";
import Image from "next/image";
import Link from "next/link";

const TopRented = async () => {
  const books = await getTopRented();

  return (
    <>
      {!books?.length && <p>Something went wrong</p>}
      <div className="space-y-6">
        {!!books?.length &&
          books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex flex-nowrap space-x-4 bg-gradient-to-br dark:from-zinc-900 rounded-lg hover:bg-zinc-900 transition duration-500"
            >
              <div className="relative aspect-[3/4] basis-1/3 md:basis-1/4">
                <Image
                  priority
                  fill
                  src={book.cover}
                  alt="Book cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-xl md:text-2xl font-bold">{book.name}</h3>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default TopRented;
