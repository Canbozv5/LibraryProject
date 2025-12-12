import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../api/authorService";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";

// This component managing Author List
export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // API for authors
  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (error) {
      toast.error("Couldnt load the author list.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // delete author and about to situation get feedback with toast
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await deleteAuthor(id);
      setAuthors((prev) => prev.filter((p) => p.id !== id));
      toast.success("The author was deleted successfully!");
    } catch (error) {
      toast.error("Error during deletion.", error);
    }
  };

  // edited author
  const handleEdit = (authorToEdit) => {
    setSelectedAuthor(authorToEdit);
    setShowForm(true);
  };

  // new author
  const handleNew = () => {
    setSelectedAuthor(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchAuthors();
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] text-white mx-auto p-6">Loading...</div>
    );
  }

  // Layout for the list
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New author button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-yellow-600 dark:bg-yellow-900 dark:hover:bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500 dark:hover:shadow-yellow-700"
      >
        Add New Author
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 dark:shadow-yellow-700 bg-orange-100 dark:bg-stone-500">
          <AuthorForm
            initialData={selectedAuthor}
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
                Name
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Birth Date
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Country
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Actions
              </th>
            </tr>
          </thead>

          {/* List body  */}

          <tbody>
            {authors.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.id}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.birthDate}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.country}
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
