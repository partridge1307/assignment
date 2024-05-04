import { getBook } from "@/api/books";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { parse } from "marked"
import AddToCart from "@/components/cart/add-to-cart-button";
import { asyncGetUser } from "@/api/auth";
import RecommendationsToUser from "@/components/book/recommendations-to-user";

const Book = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id);
  if (!book) return notFound();
  const user = await asyncGetUser();

  return <>
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/books/${book.id}`}>{book.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>


    <section className="flex gap-x-3 md:gap-x-6">
      <div className="relative aspect-[3/4] basis-1/2 md:basis-1/4 dark:bg-zinc-900 rounded-lg">
        <Image priority fill src={book.cover} alt={`${book.name}'s cover`} className="rounded-lg" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{book.name}</h1>
        <Link href={`/authors/${book.author_id}`} className="block">{book.author.name}</Link>
        <p className="">
          ${book.on_sale
            ? <>
              <span className="line-through">{book.price}</span>
              {" "}
              <span className="text-red-600">{book.price * 0.9}</span>
            </>
            : book.price}
        </p>

        <AddToCart isLoggedIn={!!user} bookId={book.id} />
      </div>
    </section>

    <section className="!mt-14">
      <dl className="flex flex-wrap gap-x-6">
        <div className="flex items-center space-x-1">
          <dt>Pages:</dt>
          <dd className="text-green-500">{book.pages}</dd>
        </div>
        <div className="flex items-center space-x-1">
          <dt>Sold:</dt>
          <dd>{book.sold}</dd>
        </div>
        <div className="flex items-center space-x-1">
          <dt>Published:</dt>
          <dd>{book.created_at}</dd>
        </div>
      </dl>
    </section>

    <section>
      <h2 className="text-xl font-bold">Description</h2>
      <div dangerouslySetInnerHTML={{
        __html: parse(book.description)
      }} />
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-bold">Recommendations</h2>
      <RecommendationsToUser />
    </section>
  </>
}

export default Book;
