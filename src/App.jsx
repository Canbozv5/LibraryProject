import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AuthorList from "./components/AuthorList";
import PublishersList from "./components/PublishersList";
import CategoriesList from "./components/CategoriesList";
import BookList from "./components/BookList";
import BorrowList from "./components/BorrowList";

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
