// src/pages/Books/BookList.jsx

import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/bookService";
// GEREKLİ SERVİSLERİ İÇE AKTARIN
import { getAuthors } from "../api/authorService";
import { getPublishers } from "../api/publishersService";
import { getCategories } from "../api/categoryService";

import { toast } from "react-toastify";
import BookForm from "./BookForm";

export default function BookList() {
  const [books, setBooks] = useState([]);
  // EŞLEŞTİRME İÇİN GEREKLİ LİSTELER
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // ID'ye göre listeden ismi bulan yardımcı fonksiyon
  const getNameById = (list, id) => {
    // Eşleşme yapmadan önce tiplerin tutarlı olması için String'e çevirme
    if (!id || !list || list.length === 0) return "N/A";
    const item = list.find((item) => String(item.id) === String(id));
    return item ? item.name : "Bulunamadı";
  };

  // BÜTÜN VERİLERİ Çeken Ana Fonksiyon
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // TÜM LİSTELERİ AYNI ANDA ÇEK
      const [bookRes, authorRes, publisherRes, categoryRes] = await Promise.all(
        [getBooks(), getAuthors(), getPublishers(), getCategories()]
      );

      setBooks(bookRes.data);
      setAuthors(authorRes.data);
      setPublishers(publisherRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      toast.error("Veri yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    // ... (Diğer fonksiyonlar aynı kalır)
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
    fetchAllData(); // Kayıt/Güncelleme sonrası tüm listeyi yenile
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

              {/* KRİTİK EŞLEŞTİRME */}
              <td className="border p-2">{getNameById(authors, p.authorId)}</td>
              <td className="border p-2">
                {getNameById(publishers, p.publisherId)}
              </td>
              <td className="border p-2">
                {getNameById(categories, p.categoryId)}
              </td>

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
