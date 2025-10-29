import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../api/authorService";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";

// This component menaging Author List
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
    return <div className="max-w-[1200px] mx-auto p-6">Loading...</div>;
  }

  // Layout for the list
  return (
    <div className="max-w-[1200px] mx-auto p-6 mt-14">
      {/* New author button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500"
      >
        Add New Author
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 bg-gradient-to-r from-black to-transparent">
          <AuthorForm
            initialData={selectedAuthor}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse ">
        {/* List head  */}

        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2 text-yellow-900">ID</th>
            <th className="border p-2 text-yellow-900">Name</th>
            <th className="border p-2 text-yellow-900">Birth Date</th>
            <th className="border p-2 text-yellow-900">Country</th>
            <th className="border p-2 text-yellow-900">Actions</th>
          </tr>
        </thead>

        {/* List body  */}

        <tbody>
          {authors.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                {p.id}
              </td>
              <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                {p.name}
              </td>
              <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                {p.birthDate}
              </td>
              <td className="border p-2 text-yellow-400 bg-gradient-to-r from-black to-transparent">
                {p.country}
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
  );
}
