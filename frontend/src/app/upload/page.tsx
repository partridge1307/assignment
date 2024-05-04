import { asyncGetUser } from "@/api/auth";
import UploadBookForm from "@/components/book/upload-form";
import { redirect } from "next/navigation";

const Upload = async () => {
  const user = await asyncGetUser();
  if (!user || user.permission !== 'admin') return redirect('/');

  return <>
    <section>
      <UploadBookForm />
    </section>
  </>
}

export default Upload
