import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // pages for nav and their paths
  const navItems = [
    { name: "Home Page", path: "/" },
    { name: "Authors", path: "/authors" },
    { name: "Publishers", path: "/publishers" },
    { name: "Categories", path: "/categories" },
    { name: "Books", path: "/books" },
    { name: "Borrow", path: "/borrow" },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-emerald-900 dark:bg-emerald-950 border-b border-yellow-600 text-white p-4 w-full">
        {" "}
        <div className="container mx-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-yellow-400 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>

          {/* Nav Links */}
          <nav
            className={`absolute md:static top-16 left-0 w-full 
              md:w-auto bg-emerald-800 dark:bg-emerald-950 md:bg-transparent z-50 
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? "block" : "hidden"} md:block`}
          >
            <ul
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 
            md:space-x-6 md:justify-evenly font-bold text-xl p-4 md:p-0 text-center"
            >
              {/* map for navitems*/}
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)} // when link clicked menu will be closed
                    className={({ isActive }) =>
                      // when its active become yellow, others white
                      `hover:text-yellow-400 transition-colors ${
                        isActive
                          ? "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1"
                          : "text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
