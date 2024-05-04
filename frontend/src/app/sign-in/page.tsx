import { asyncGetUser } from "@/api/auth";
import SignInForm from "@/components/auth/sign-in-form"
import { redirect } from "next/navigation"

const App = async () => {
  const session = await asyncGetUser();
  if (session) return redirect("/");

  return <main className="min-h-screen flex flex-col justify-center items-center space-y-4">
    <h1 className="uppercase text-2xl">Sign in</h1>
    <SignInForm />
  </main>
}

export default App;
