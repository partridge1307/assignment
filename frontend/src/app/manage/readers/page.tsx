import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";
import { cookies } from "next/headers";
import Link from "next/link";

const ReadersList = async () => {
  const { data, status } = await api.get("/users", {
    headers: {
      Cookie: `accessToken=${cookies().get("accessToken")?.value}`,
    },
  });

  if (status !== 200) {
    return <p>API errors</p>;
  }

  const users = data.data as Array<{
    id: number;
    username: string;
    created_at: string;
  }>;

  return (
    <section>
      {!users.length && (
        <p className="text-center mt-5">
          Currently library doesn't have any user. Want to{" "}
          <Link
            href="/manage/readers/add"
            className="underline underline-offset-2"
          >
            add a reader
          </Link>
          ?
        </p>
      )}

      <Table>
        <TableCaption>Readers list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="w-[300px]">Created at</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!users.length &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell className="space-x-4">
                  <Link
                    href={`/manage/readers/edit/${user.id}`}
                    className="underline underline-offset-2"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/manage/readers/${user.id}`}
                    className="underline underline-offset-2"
                  >
                    Books rented
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ReadersList;
