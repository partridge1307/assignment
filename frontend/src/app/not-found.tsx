import Link from "next/link";

const NotFound = () => {
  return <section className="min-h-screen flex flex-col space-y-6 justify-center items-center">
    <h1 className="text-4xl font-bold">Not Found</h1>
    <Link href="/">Return to homepage</Link>
  </section>
};

export default NotFound;
