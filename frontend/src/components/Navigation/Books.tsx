import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Books = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent">
        Books management
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] *:p-3 *:rounded-md *:text-center">
          <Link
            href="/manage/books/add"
            title="Add a book"
            className="hover:bg-zinc-800"
          >
            Add new book
          </Link>
          <Link
            href="/manage/books"
            title="List all books"
            className="hover:bg-zinc-600"
          >
            List books
          </Link>
          <Link
            href="/manage/authors/add"
            title="Add a author"
            className="hover:bg-zinc-600"
          >
            Add new author
          </Link>
          <Link
            href="/manage/authors"
            title="List all authors"
            className="hover:bg-zinc-600"
          >
            List authors
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Books;
