import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/categoryService";
import { toast } from "react-toastify";
import CategoriesForm from "./CategoriesForm";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      toast.error("Yazar listesi yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await deleteCategory(id);

      setCategories((prev) => prev.filter((p) => p.id !== id));
      toast.success("Category başarıyla silindi!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.");
      console.error("Silme Hatası:", error);
    }
  };

  const handleEdit = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchCategories();
    setShowForm(false);
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto p-6">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Yeni Category Ekle
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
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Category Name</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
