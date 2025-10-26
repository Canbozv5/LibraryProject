import React, { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../api/authorService";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (error) {
      toast.error("Yazar listesi yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await deleteAuthor(id);

      setAuthors((prev) => prev.filter((p) => p.id !== id));
      toast.success("Yazar başarıyla silindi!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.");
      console.error("Silme Hatası:", error);
    }
  };

  const handleEdit = (authorToEdit) => {
    setSelectedAuthor(authorToEdit);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedAuthor(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchAuthors();
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
        Yeni Yazar Ekle
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <AuthorForm
            initialData={selectedAuthor}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Birth Date</th>
            <th className="border p-2 text-left">Country</th>
            <th className="border p-2 text-left">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.birthDate}</td>
              <td className="border p-2">{p.country}</td>
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
