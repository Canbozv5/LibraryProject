import React, { useEffect, useState } from "react";
import { getPublishers, deletePublisher } from "../api/publishersService";
import { toast } from "react-toastify";
import PublisherForm from "./PublisherForm";

export default function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const fetchPublishers = async () => {
    setLoading(true);
    try {
      const res = await getPublishers();
      setPublishers(res.data);
    } catch (error) {
      toast.error("Yayımcı listesi yüklenirken bir hata oluştu.");
      console.error("Yüklenme Hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await deletePublisher(id);

      setPublishers((prev) => prev.filter((p) => p.id !== id));
      toast.success("Yayımcı başarıyla silindi!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.");
      console.error("Silme Hatası:", error);
    }
  };

  const handleEdit = (publisherToEdit) => {
    setSelectedPublisher(publisherToEdit);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedPublisher(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchPublishers();
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
        Yeni Yayımcı Ekle
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <PublisherForm
            initialData={selectedPublisher}
            onSuccess={handleFormSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Adı</th>
            <th className="border p-2 text-left">Adres</th>
            <th className="border p-2 text-left">Kuruluş Yılı</th>
            <th className="border p-2 text-left">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {publishers.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.address}</td>
              <td className="border p-2">{p.establishmentYear}</td>
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
