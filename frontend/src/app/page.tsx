import RecommendationsToUser from "@/components/book/recommendations-to-user";
import dynamic from "next/dynamic";

const BookCarousel = dynamic(() => import("@/components/book/book-carousel"));
const Books = dynamic(() => import("@/components/book/books"));
const TopRented = dynamic(() => import("@/components/statistics/TopRented"));

const App = () => {
  return (
    <>
      <section>
        <BookCarousel />
      </section>

      <div className="grid grid-cols-[1fr_.5fr] gap-x-8">
        <div>
          <section id="new" className="!mt-20 space-y-4">
            <h1 className="uppercase text-4xl">new products</h1>
            <Books />
          </section>

          <section id="for-you" className="!mt-20 space-y-4">
            <h1 className="uppercase text-4xl">for you</h1>
            <RecommendationsToUser />
          </section>
        </div>

        <div className="!mt-20 space-y-4">
          <h1 className="uppercase text-4xl">top rented</h1>
          <TopRented />
        </div>
      </div>
    </>
  );
};

export default App;
