import RecommendationsToUser from "@/components/book/recommendations-to-user";
import dynamic from "next/dynamic";

const BookCarousel = dynamic(() => import("@/components/book/book-carousel"))
const Books = dynamic(() => import("@/components/book/books"))

const App = () => {
  return <>
    <section>
      <BookCarousel />
    </section>

    <section id="new" className="!mt-28 space-y-4">
      <h1 className="uppercase text-4xl">new products</h1>
      <Books />
    </section>

    <section id='for-you' className="!mt-20 space-y-4">
      <h1 className="uppercase text-4xl">for you</h1>
      <RecommendationsToUser />
    </section>
  </>
}

export default App;
