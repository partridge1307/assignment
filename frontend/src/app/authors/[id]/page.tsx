import { getBookByAuthor } from "@/api/books";
import Image from "next/image";
import Link from "next/link";

const AuthorBooks = async ({ params }: { params: { id: string } }) => {
  const books = await getBookByAuthor(params.id);

  if (!books) return <p>Something went wrong</p>;

  if (!books.length) return <p>No records</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {books.map((book) => (
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
            <p className="opacity-75">{book.sold} rented</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AuthorBooks;
