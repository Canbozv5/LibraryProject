import { useState, useEffect } from "react";

function FloatingMenu() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="menu fixed bottom-24 max-[768px]:bottom-14 max-[768px]:right-0 right-4 z-50">
        <input
          type="checkbox"
          className="menu-open hidden"
          name="menu-open"
          id="menu-open"
        />
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </label>
        <button
          onClick={toggleTheme}
          className="menu-item bg-yellow-500 text-white"
        >
          {theme === "light" ? (
            <i className="fa-regular fa-lightbulb text-xl"></i>
          ) : (
            <i className="fa-solid fa-lightbulb text-xl"></i>
          )}
        </button>
        <a
          href="https://github.com/Canbozv5"
          target="_blank"
          className="menu-item github bg-gray-800 text-white"
        >
          <i className="fa-brands fa-github text-xl"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/emrecanboz/"
          target="_blank"
          className="menu-item linkedin bg-blue-700 text-white"
        >
          <i className="fa-brands fa-linkedin-in text-xl"></i>
        </a>
        <a
          href="mailto:canboz3460@gmail.com"
          target="_blank"
          className="menu-item bg-green-600 text-white"
        >
          <i className="fa fa-envelope text-xl"></i>
        </a>
      </div>
    </>
  );
}

export default FloatingMenu;
