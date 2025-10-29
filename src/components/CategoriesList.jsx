import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/categoryService";
import { toast } from "react-toastify";
import CategoriesForm from "./CategoriesForm";

// This component menaging Category List
export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // API for category
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      toast.error("Couldnt load the category list.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // delete category and about to situation get feedback with toast
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((p) => p.id !== id));
      toast.success("The category was deleted successfully!");
    } catch (error) {
      toast.error("Error during deletion.", error);
    }
  };

  // edited category
  const handleEdit = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setShowForm(true);
  };

  // new category
  const handleNew = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchCategories();
    setShowForm(false);
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto p-6">Loading...</div>;
  }

  // Layout for List
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New category button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Category
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <CategoriesForm
            initialData={selectedCategory}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse">
        {/* List head  */}

        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Category Name</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        {/* List body  */}

        <tbody>
          {categories.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>

              {/* EDIT or DELETE buttons */}

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
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
