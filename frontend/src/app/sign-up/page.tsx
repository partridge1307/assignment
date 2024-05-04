import { asyncGetUser } from "@/api/auth";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/auth/sign-up-form";

const SignUp = async () => {
  const session = await asyncGetUser();

  if (session) return redirect("/");

  return <main className="min-h-screen flex flex-col justify-center items-center space-y-4">
    <h1 className="uppercase text-2xl">Sign up</h1>
    <SignUpForm />
  </main>
}

export default SignUp
