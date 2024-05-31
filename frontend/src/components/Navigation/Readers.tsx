import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Readers = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent">
        Readers management
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] *:p-3 *:rounded-md *:text-center">
          <Link
            href="/manage/readers/add"
            title="Add a reader"
            className="hover:bg-zinc-800"
          >
            Add new reader
          </Link>
          <Link
            href="/manage/readers"
            title="List all readers"
            className="hover:bg-zinc-600"
          >
            List readers
          </Link>
          <Link
            href="/manage/rent"
            title="Add rent"
            className="hover:bg-zinc-800"
          >
            Add rent
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Readers;
