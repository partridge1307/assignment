import { useMutation } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { searchBooks } from "@/api/books";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Search = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const mutation = useMutation({
    mutationFn: searchBooks,
  });

  function onChangeHanlder(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    mutation.mutate(e.target.value);
  }

  return (
    <div className="relative">
      <Input
        type="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn("max-sm:hidden transition duration-500", {
          "w-44": !focused,
          "w-96": focused,
        })}
        placeholder="Search for books"
        value={query}
        onChange={onChangeHanlder}
      />
      {!!query && mutation.isSuccess && !!mutation.data && (
        <ul
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-x-0 top-[110%] dark:bg-zinc-800 p-1 rounded-lg"
        >
          {mutation.data.map((book) => (
            <li key={book.id}>
              <Link
                href={`/books/${book.id}`}
                className="p-2 rounded-lg block hover:bg-background"
                onClick={() => setQuery("")}
              >
                {book.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
