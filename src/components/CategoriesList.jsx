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
    return (
      <div className="max-w-[1200px] text-white mx-auto p-6">Loading...</div>
    );
  }

  // Layout for List
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New category button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-yellow-600 dark:bg-yellow-900 dark:hover:bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500 dark:hover:shadow-yellow-700"
      >
        Add New Category
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 dark:shadow-yellow-700 bg-orange-100 dark:bg-stone-500">
          <CategoriesForm
            initialData={selectedCategory}
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
                Category Name
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Description
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Actions
              </th>
            </tr>
          </thead>

          {/* List body  */}

          <tbody>
            {categories.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.id}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {p.description}
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
