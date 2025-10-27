import React, { useEffect, useState } from "react";
import { getBorrows, deleteBorrow } from "../api/borrowService";
import { toast } from "react-toastify";
import BorrowForm from "./BorrowForm";

export default function BorrowList() {
  const [borrows, setBorrows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedBorrow, setSelectedBorrow] = useState(null);

  const fetchBorrows = async () => {
    setLoading(true);
    try {
      const res = await getBorrows();
      setBorrows(res.data);
    } catch (error) {
      toast.error("Ödünç alım listesi yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await deleteBorrow(id);
      setBorrows((prev) => prev.filter((p) => p.id !== id));
      toast.success("Ödünç alım başarıyla silindi!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.");
      console.error("Silme Hatası:", error);
    }
  };

  const handleEdit = (borrowToEdit) => {
    setSelectedBorrow(borrowToEdit);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedBorrow(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchBorrows();
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
        New Borrow Ekle
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <BorrowForm
            initialData={selectedBorrow}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Borrower Name</th>
            <th className="border p-2 text-left">Borrower Mail</th>
            <th className="border p-2 text-left">Borrowing Date</th>
            <th className="border p-2 text-left">Return Date</th>
            <th className="border p-2 text-left">Book</th>
            <th className="border p-2 text-left">Author</th>
            <th className="border p-2 text-left">Publisher</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {borrows.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.borrowerName}</td>
              <td className="border p-2">{p.borrowerMail}</td>
              <td className="border p-2">{p.borrowingDate}</td>
              <td className="border p-2">{p.returnDate}</td>
              <td className="border p-2">{p.book?.name || "N/A"}</td>
              <td className="border p-2">{p.author?.name || "N/A"}</td>
              <td className="border p-2">{p.publisher?.name || "N/A"}</td>
              <td className="border p-2">
                {p.categories && p.categories.length > 0
                  ? p.categories[0].name
                  : "N/A"}
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
