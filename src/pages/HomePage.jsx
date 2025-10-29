// doing import for images
import albertcamus1 from "../assets/images/albertcamus1.jpg";
import albertcamus2 from "../assets/images/albertcamus2.jpg";
import franzkafka1 from "../assets/images/franzkafka1.jpg";
import franzkafka2 from "../assets/images/franzkafka2.jpg";
import jamesjoyce1 from "../assets/images/jamesjoyce1.jpg";
import levtolstoy1 from "../assets/images/levtolstoy1.jpg";
import orhanpamuk2 from "../assets/images/orhanpamuk2.jpg";
import jamesjoyce2 from "../assets/images/jamesjoyce2.jpg";

function HomePage() {
  return (
    // main conent
    <main className="container mx-auto">
      <section className="flex flex-col items-center italic">
        {/* main header */}
        <h1 className="font-bold text-yellow-100 text-8xl mt-16 shadow-xl shadow-yellow-500 hover:blur cursor-pointer">
          Welcome to Can's Library
        </h1>

        {/* Author images  - 4 columns grid */}
        <div className="grid grid-cols-4 gap-x-12 gap-y-4 mt-20 w-4xl">
          {/* Albert Camus  */}
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={albertcamus1}
            alt="Albert Camus"
          />
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={albertcamus2}
            alt="Albert Camus"
          />

          {/* James Joyce */}
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={jamesjoyce1}
            alt="James Joyce"
          />
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={jamesjoyce2}
            alt="James Joyce"
          />

          {/* Franz Kafka */}
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={franzkafka2}
            alt="Franz Kafka"
          />
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={franzkafka1}
            alt="Franz Kafka"
          />

          {/* Orhan Pamuk*/}
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={orhanpamuk2}
            alt="Orhan Pamuk"
          />

          {/* Lev Tolstoy*/}
          <img
            className="cursor-not-allowed skew-y-12 w-[150px] h-[200px]"
            src={levtolstoy1}
            alt="Lev Tolstoy"
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
