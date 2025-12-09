import React from "react";

function Footer() {
  return (
    <>
      {/* footer */}
      <footer className="w-full bg-emerald-900 dark:bg-emerald-950 text-yellow-400 border-t border-yellow-600 mt-10">
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
    </>
  );
}

export default Footer;
