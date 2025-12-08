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

      {/* floating menu */}
      <div class="menu fixed bottom-24 max-[768px]:bottom-14 max-[768px]:right-0 right-4 z-50">
        <input
          type="checkbox"
          href="#"
          class="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label class="menu-open-button" for="menu-open">
          <span class="lines line-1"></span>
          <span class="lines line-2"></span>
          <span class="lines line-3"></span>
        </label>
        <a href="#" class="menu-item dark">
          {" "}
          <i class="fa-solid fa-lightbulb"></i>{" "}
        </a>
        <a
          href="https://github.com/Canbozv5"
          target="blank"
          class="menu-item github"
        >
          {" "}
          <i class="fa-brands fa-github"></i>{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/emrecanboz/"
          target="blank"
          class="menu-item linkedin"
        >
          {" "}
          <i class="fa-brands fa-linkedin-in"></i>{" "}
        </a>
        <a href="#" class="menu-item light">
          {" "}
          <i class="fa-regular fa-lightbulb"></i>{" "}
        </a>
      </div>

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
