import { getBooks } from "@/api/books";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

const BooksList = async () => {
  const books = await getBooks();

  if (!books) return <p>No records</p>;

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>Books list</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[50px]">Rented</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books.map((book, index) => (
          <TableRow key={index}>
            <TableCell>{book.id}</TableCell>
            <TableCell className="relative w-16 h-32">
              <Image
                fill
                src={book.cover}
                alt={`${book.name}\'s cover`}
                className="rounded object-cover"
              />
            </TableCell>
            <TableCell>{book.name}</TableCell>
            <TableCell>{book.sold}</TableCell>
            <TableCell>
              <Link
                href={`/books/${book.id}`}
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

export default BooksList;
