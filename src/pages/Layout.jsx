import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div
      id="main"
      className="min-h-screen flex flex-col bg-cover bg-fixed bg-center z-30"
    >
      <Header />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="w-full bg-emerald-900 text-yellow-400 border-t border-yellow-600 mt-10">
        <div className="container mx-auto py-6">
          {/* sign by creater */}
          <p className="text-center text-lg md:text-xl">
            © {new Date().getFullYear()}{" "}
            <span className="text-white hover:drop-shadow-xl font-bold">
              {" "}
              <a href="https://www.linkedin.com/in/emrecanboz/" target="blank">
                Emre Can BOZ
              </a>
            </span>{" "}
            · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
