import { Outlet } from "react-router-dom";
import Header from "./Header";
import FloatingMenu from "./FloatingMenu";
import Footer from "./Footer";

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

      <FloatingMenu />

      <Footer />
    </div>
  );
}
