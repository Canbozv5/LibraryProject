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
        className="mb-4 p-2 bg-yellow-600 dark:bg-yellow-900 dark:hover:bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500 dark:hover:shadow-yellow-700"
      >
        Add New Book
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 dark:shadow-yellow-700 bg-orange-100 dark:bg-stone-500">
          <BookForm
            initialData={selectedBook}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="overflow-x-auto w-full mt-4 border border-yellow-600 rounded-lg shadow-lg shadow-yellow-400 dark:shadow-yellow-700">
        <table className="min-w-full border-collapse whitespace-nowrap">
          {/* List head  */}

          <thead>
            <tr className="bg-white dark:bg-gray-400 text-center">
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                ID
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Book Name
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Publication Year
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                stock
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Author
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Publisher
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Category
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Actions
              </th>
            </tr>
          </thead>

          {/* List body  */}

          <tbody>
            {books.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.id}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.publicationYear}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.stock}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.author?.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.publisher?.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.categories && p.categories.length > 0
                    ? p.categories[0].name
                    : "n/a"}
                </td>

                {/* EDIT or DELETE buttons */}

                <td className="border p-2 space-x-2 bg-orange-100 dark:bg-stone-500">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 dark:text-blue-400 dark:hover:text-blue-700 font-semibold hover:underline"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 dark:text-red-900 dark:hover:text-red-500 font-semibold hover:underline"
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
