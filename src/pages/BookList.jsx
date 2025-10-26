import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/bookService";
import { toast } from "react-toastify";
import BookForm from "./BookForm";

export default function BookList() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      toast.error("Kitap listesi yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await deleteBook(id);

      setBooks((prev) => prev.filter((p) => p.id !== id));
      toast.success("Kitap başarıyla silindi!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.");
      console.error("Silme Hatası:", error);
    }
  };

  const handleEdit = (bookToEdit) => {
    setSelectedBook(bookToEdit);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchBooks();
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
        Yeni Kitap Ekle
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <BookForm
            initialData={selectedBook}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Book Name</th>
            <th className="border p-2 text-left">Publication Year</th>
            <th className="border p-2 text-left">Stok</th>
            <th className="border p-2 text-left">Author</th>
            <th className="border p-2 text-left">Publisher</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {books.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.publicationYear}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.author?.name || "N/A"}</td>
              <td className="border p-2">{p.publisher?.name || "N/A"}</td>
              <td className="border p-2">{p.category?.name || "N/A"}</td>
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
