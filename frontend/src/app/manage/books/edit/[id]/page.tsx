import { getBook } from "@/api/books";
import EditBookForm from "@/components/book/edit-form";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id);

  return (
    <>
      {!book && <p>Not found</p>}
      {!!book && <EditBookForm book={book} />}
    </>
  );
};

export default EditBook;
