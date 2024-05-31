import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Statistics = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent">
        Statistics
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] *:p-3 *:rounded-md *:text-center">
          <Link
            href="/manage/statistics"
            title="Most rented"
            className="hover:bg-zinc-800"
          >
            Borrowed books are rented the most
          </Link>
          <Link
            href="/manage/statistics/outstanding-rent"
            title="Outstanding rented"
            className="hover:bg-zinc-800"
          >
            Outstanding rent
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Statistics;
