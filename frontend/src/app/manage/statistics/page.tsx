import { GroupedBooks, getMostRented } from "@/api/statistics";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { basename } from "path";

export type Series = {
  label: string;
  data: GroupedBooks[];
};

const MostRented = async () => {
  const books = await getMostRented();

  if (!books) return <p>No records</p>;

  return (
    <Table>
      <TableCaption>Borrowed books are rented the most</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books.map((book) => (
          <TableRow key={book.book_id}>
            <TableCell>{book.book_id}</TableCell>
            <TableCell>{book._sum.quantity}</TableCell>
            <TableCell>
              <Link
                href={`/books/${book.book_id}`}
                className="underline underline-offset-2"
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MostRented;
