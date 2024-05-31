import { getRandomBooks } from "@/api/books";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";

const BookCarousel = async () => {
  const books = await getRandomBooks();

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {books?.map((book) => (
          <CarouselItem key={book.id} className="basis-full">
            <Link
              href={`/books/${book.id}`}
              className="flex flex-nowrap gap-x-3 md:gap-x-6 md:px-16 bg-gradient-to-br dark:from-zinc-900 rounded-lg hover:bg-zinc-900 transition duration-500"
            >
              <div className="relative aspect-[3/4] basis-1/2 md:basis-1/4">
                <Image
                  priority
                  fill
                  src={book.cover}
                  alt="Carousel Cover"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-2xl md:text-4xl font-bold">{book.name}</h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 max-sm:top-full max-sm:translate-y-0 md:left-4 md:scale-150" />
      <CarouselNext className="right-0 max-sm:top-full max-sm:translate-y-0 md:right-4 md:scale-150" />
    </Carousel>
  );
};

export default BookCarousel;
