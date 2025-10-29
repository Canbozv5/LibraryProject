import { useEffect, useState } from "react";
import { getPublishers, deletePublisher } from "../api/publishersService";
import { toast } from "react-toastify";
import PublisherForm from "./PublisherForm";

// This component menaging Publisher List
export default function PublishersList() {
  const [publishers, setPublishers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedPublisher, setSelectedPublisher] = useState(null);

  // API for publishers
  const fetchPublishers = async () => {
    setLoading(true);
    try {
      const res = await getPublishers();
      setPublishers(res.data);
    } catch (error) {
      toast.error("Couldnt load the borrow list.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  // delete publisher and about to situation get feedback with toast
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await deletePublisher(id);
      setPublishers((prev) => prev.filter((p) => p.id !== id));
      toast.success("The publisher was deleted successfully!");
    } catch (error) {
      toast.error("Silme işleminde bir hata oluştu.", error);
    }
  };

  // edited publisher
  const handleEdit = (publisherToEdit) => {
    setSelectedPublisher(publisherToEdit);
    setShowForm(true);
  };

  // new publisher
  const handleNew = () => {
    setSelectedPublisher(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchPublishers();
    setShowForm(false);
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto p-6">Loading...</div>;
  }

  // Layout for list
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New publisher button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Publisher
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
        {/* List head  */}

        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Address</th>
            <th className="border p-2 text-left">Establishment Year</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        {/* List body  */}

        <tbody>
          {publishers.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.address}</td>
              <td className="border p-2">{p.establishmentYear}</td>

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
