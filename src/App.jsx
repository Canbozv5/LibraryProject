import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AuthorList from "./components/AuthorList";
import PublishersList from "./components/PublishersList";
import CategoriesList from "./components/CategoriesList";
import BookList from "./components/BookList";
import BorrowList from "./components/BorrowList";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    // managing URL's head router
    <BrowserRouter>
      {/* main wrapper*/}
      <Routes>
        {/* main layout for header and footer in all pages */}
        <Route path="/" element={<Layout />}>
          {/* main page route */}
          <Route index element={<HomePage />} />

          {/* /authors */}
          <Route path="authors" element={<AuthorList />} />

          {/* /publishers */}
          <Route path="publishers" element={<PublishersList />} />

          {/* /categories */}
          <Route path="categories" element={<CategoriesList />} />

          {/* /books */}
          <Route path="books" element={<BookList />} />

          {/* /borrow */}
          <Route path="borrow" element={<BorrowList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
