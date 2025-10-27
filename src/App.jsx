import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import PublishersList from "./pages/PublishersList";
import AuthorList from "./pages/AuthorList";
import CategoriesList from "./pages/CategoriesList";
import BookList from "./pages/BookList";
import BorrowList from "./pages/BorrowList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="authors" element={<AuthorList />} />
          <Route path="publishers" element={<PublishersList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="books" element={<BookList />} />
          <Route path="borrow" element={<BorrowList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
