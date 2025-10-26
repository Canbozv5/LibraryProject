import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
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
      <header>
        <div>
          <h1>Can's Library</h1>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `hover:text-blue-400 transition-colors ${
                        isActive
                          ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                          : "text-gray-300"
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
