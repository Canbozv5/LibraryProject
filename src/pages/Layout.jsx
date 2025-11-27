import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div
      id="main"
      className="min-h-screen flex flex-col bg-cover bg-fixed bg-center"
    >
      <Header />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="w-full bg-amber-600 text-yellow-100 border-t border-yellow-600 mt-10">
        <div className="container mx-auto py-6">
          {/* sign by creater */}
          <p className="text-center text-lg md:text-xl">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">Emre Can BOZ</span> · All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
