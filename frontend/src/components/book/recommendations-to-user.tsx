"use client";

import { useQuery } from "@tanstack/react-query";
import { recommendationsToUser } from "@/api/recommendations";
import Link from "next/link";
import Image from "next/image";

const RecommendationsToUser = () => {
  const query = useQuery({
    queryKey: ["recommendations", "user"],
    queryFn: recommendationsToUser,
  });

  return (
    <ul className="grid grid-cols-2 gap-4">
      {!!query.data &&
        query.data.map((book) => (
          <li key={book.id}>
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
                <p className="opacity-75">{book.sold} Rented</p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default RecommendationsToUser;
