import { getAuthors } from "@/api/author";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AuthorsList = async () => {
  const authors = await getAuthors();

  if (!authors) return <p>No records</p>;

  return (
    <Table>
      <TableCaption>Authors list</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[300px]">Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {authors.map((author, index) => (
          <TableRow key={index}>
            <TableCell>{author.id}</TableCell>
            <TableCell>{author.name}</TableCell>
            <TableCell>{author.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuthorsList;
