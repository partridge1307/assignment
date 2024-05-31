import { getOutstandingRent } from "@/api/statistics";
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

const OutstandingRent = async () => {
  const books = await getOutstandingRent();

  if (!books) return <p>Something went wrong</p>;

  if (!books.length)
    return <p>Currently, there are no books that have outstanding rent</p>;

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>Outstanding rent</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Rented by user id</TableHead>
          <TableHead>Rent to</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books.map((book, index) => (
          <TableRow key={index}>
            <TableCell>{book.book_id}</TableCell>
            <TableCell className="relative w-16 h-32">
              <Image
                fill
                src={book.books.cover}
                alt="Book cover"
                className="object-cover rounded"
              />
            </TableCell>
            <TableCell>{book.books.name}</TableCell>
            <TableCell>{book.quantity}</TableCell>
            <TableCell>{book.user_id}</TableCell>
            <TableCell>{new Date(book.rent_to).toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OutstandingRent;
