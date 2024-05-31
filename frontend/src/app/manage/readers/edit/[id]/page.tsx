import { getReader } from "@/api/readers";
import EditReaderForm from "@/components/management/EditReaderForm";

const EditReader = async ({ params }: { params: { id: string } }) => {
  const reader = await getReader(params.id);

  return (
    <section className="flex h-[calc(100dvh-12rem)] justify-center items-center">
      <EditReaderForm
        id={reader?.id}
        username={reader?.username}
        created_at={reader?.created_at}
      />
    </section>
  );
};

export default EditReader;
