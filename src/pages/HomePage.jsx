import { useEffect } from "react";
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
  useEffect(() => {
    if (window.FinisherHeader) {
      new window.FinisherHeader({
        count: 5,
        size: {
          min: 1300,
          max: 1500,
          pulse: 0,
        },
        speed: {
          x: {
            min: 0,
            max: 0.2,
          },
          y: {
            min: 0,
            max: 0.4,
          },
        },
        colors: {
          background: "#a28c00",
          particles: ["#156b2a"],
        },
        blending: "overlay",
        opacity: {
          center: 0.5,
          edge: 0.05,
        },
        skew: 0,
        shapes: ["c"],
      });
    }
  }, []);
  return (
    // main content
    <main className="container mx-auto p-4">
      <div className="finisher-header z-40 relative w-full h-[100px] md:h-[150px] rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl hover:shadow-green-900 mb-16 mt-6">
        <h1 className="relative font-bold text-center text-white text-4xl md:text-6xl p-4 drop-shadow-lg">
          <a href="/books">Welcome to Can's Library</a>
        </h1>
      </div>
      <section className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-8 items-center justify-items-center italic">
        {/* Author images  - 4 columns grid */}
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Albert Camus  */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={albertcamus1}
                alt="Albert Camus"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>La Chute</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Albert Camus
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Albert Camus  */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={albertcamus2}
                alt="Albert Camus"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>The Stranger</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Albert Camus
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* James Joyce */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={jamesjoyce1}
                alt="James Joyce"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>Finnegans Wake</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  James Joyce
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* James Joyce */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={jamesjoyce2}
                alt="James Joyce"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>Portrait of Dubliner</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  James Joyce
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Franz Kafka */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={franzkafka1}
                alt="Franz Kafka"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>The Metamorphosis</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Franz Kafka
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Franz Kafka */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={franzkafka2}
                alt="Franz Kafka"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>The Metamorphosis</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Franz Kafka
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Orhan Pamuk */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={orhanpamuk2}
                alt="Orhan Pamuk"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>The Black Book</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Orhan Pamuk
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
        <div className="panel flex flex-col mt-4 w-4xl border-2 border-yellow-500 rounded-lg p-3 bg-emerald-800 dark:bg-emerald-950 md:text-center">
          {/* Lev Tolstoy */}
          <div className="flex flex-row items-center">
            <div className="max-h-70">
              <img
                className="books_home skew-y-12 w-[75px] h-[100px] md:w-[90px] md:h-[140px] md:pl-1"
                src={levtolstoy1}
                alt="Lev Tolstoy"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <span class="inline-flex text-white items-center bg-amber-600 dark:bg-amber-900 text-xs font-medium px-1.5 py-0.5 rounded-lg">
                  <svg
                    class="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
              </div>
              <div className="text-yellow-500 dark:text-yellow-700 text-center">
                <h3>Anna Karenina</h3>
                <span className="text-xs lg:text-base text-gray-400 ">
                  Lev Tolstoy
                </span>
                <p className="text-xs lg:text-base">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-amber-600 dark:bg-amber-900 dark:hover:bg-amber-600 hover:bg-amber-800 text-white font-bold py-1 rounded-lg shadow-md transition-colors text-center text-xs md:text-base">
            <button>
              <a href="/borrow">BORROW</a>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
