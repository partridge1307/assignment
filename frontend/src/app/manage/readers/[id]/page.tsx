import { getUserBooksRent } from "@/api/rent";
import DeleteBookRentButton from "@/components/management/DeleteBookRentButton";
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

const UserBooksRent = async ({ params }: { params: { id: string } }) => {
  const booksRent = await getUserBooksRent(params.id);

  if (!booksRent) return <p>Something went wrong</p>;
  if (!booksRent.length) return <p>This user did not rent anything</p>;

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>{params.id} books rent</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[50px]">Quantity</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {booksRent.map((book) => (
          <TableRow key={book.book_id}>
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
            <TableCell>
              <DeleteBookRentButton
                user_id={Number(params.id)}
                book_id={book.book_id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserBooksRent;
