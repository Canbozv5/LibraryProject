import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/bookService";
import { toast } from "react-toastify";
import BookForm from "./BookForm";

// This component menaging Book List
export default function BookList() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  // API for books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      toast.error("Couldnt load the book list.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // delete book and about to situation get feedback with toast
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete??")) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((p) => p.id !== id));
      toast.success("The borrow was deleted successfully!");
    } catch (error) {
      toast.error("Error during deletion.", error);
    }
  };

  // edited book
  const handleEdit = (bookToEdit) => {
    setSelectedBook(bookToEdit);
    setShowForm(true);
  };

  // new borrow
  const handleNew = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchBooks();
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] text-white mx-auto p-6">Loading...</div>
    );
  }

  // Layout for List
  return (
    <div className="max-w-[1200px] mx-auto p-6 ">
      {/* New book button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500"
      >
        Add New Book
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 bg-gradient-to-r from-black to-transparent">
          <BookForm
            initialData={selectedBook}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="overflow-x-auto w-full mt-4 border border-yellow-600 rounded-lg">
        <table className="min-w-full border-collapse whitespace-nowrap">
          {/* List head  */}

          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2 text-yellow-900">ID</th>
              <th className="border p-2 text-yellow-900">Book Name</th>
              <th className="border p-2 text-yellow-900">Publication Year</th>
              <th className="border p-2 text-yellow-900">Stok</th>
              <th className="border p-2 text-yellow-900">Author</th>
              <th className="border p-2 text-yellow-900">Publisher</th>
              <th className="border p-2 text-yellow-900">Category</th>
              <th className="border p-2 text-yellow-900">Actions</th>
            </tr>
          </thead>

          {/* List body  */}

          <tbody>
            {books.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.id}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.name}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.publicationYear}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.stock}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.author?.name}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.publisher?.name}
                </td>
                <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                  {p.categories && p.categories.length > 0
                    ? p.categories[0].name
                    : "n/a"}
                </td>

                {/* EDIT or DELETE buttons */}

                <td className="border p-2 space-x-2 bg-gradient-to-r from-black to-transparent">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
