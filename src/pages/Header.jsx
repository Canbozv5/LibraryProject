import { NavLink } from "react-router-dom";

function Header() {
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
      <header>
        <div className="container mx-auto mt-10">
          <nav className="mx-auto">
            <ul className="flex justify-evenly space-x-6 font-bold text-xl">
              {/* map for navitems*/}
              {navItems.map((item) => (
                <li key={item.path}>
                  {/* Navlinks*/}
                  <NavLink
                    to={item.path}
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

      {/* footer */}
      <footer className="container mx-auto">
        <div className="container border rounded-md text-yellow-100 rounded-md shadow-inner shadow-yellow-500 min-h-24 fixed bottom-1">
          {/* sign by creater */}
          <p className="text-center my-10 text-4xl">
            © {new Date().getFullYear()}{" "}
            <span className="text-white">Emre Can BOZ</span> · All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Header;
