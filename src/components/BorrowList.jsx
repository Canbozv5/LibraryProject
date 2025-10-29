import { useEffect, useState } from "react";
import { getBorrows, deleteBorrow } from "../api/borrowService";
import { toast } from "react-toastify";
import BorrowForm from "./BorrowForm";

// This component menaging Borrow List
export default function BorrowList() {
  const [borrows, setBorrows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedBorrow, setSelectedBorrow] = useState(null);

  // API for borrows
  const fetchBorrows = async () => {
    setLoading(true);
    try {
      const res = await getBorrows();
      setBorrows(res.data);
    } catch (error) {
      toast.error("Couldnt load the borrow list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  // delete borrow and about to situation get feedback with toast
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await deleteBorrow(id);
      setBorrows((prev) => prev.filter((p) => p.id !== id));
      toast.success("The borrow was deleted successfully!");
    } catch (error) {
      toast.error("Error during deletion.", error);
    }
  };

  // edited borrow
  const handleEdit = (borrowToEdit) => {
    setSelectedBorrow(borrowToEdit);
    setShowForm(true);
  };

  // new borrow
  const handleNew = () => {
    setSelectedBorrow(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchBorrows();
    setShowForm(false);
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto p-6">Loading...</div>;
  }

  // Layout for List
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New borrowing button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Borrowing
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
        {/* List head  */}

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
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        {/* List body  */}

        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow.id} className="hover:bg-gray-50">
              <td className="border p-2">{borrow.id}</td>
              <td className="border p-2">{borrow.borrowerName}</td>
              <td className="border p-2">{borrow.borrowerMail}</td>
              <td className="border p-2">{borrow.borrowingDate}</td>
              <td className="border p-2">
                {borrow.returnDate || "Not returned yet."}
              </td>
              <td className="border p-2">{borrow.book?.name}</td>
              <td className="border p-2">{borrow.book?.author?.name}</td>
              <td className="border p-2">{borrow.book?.publisher?.name}</td>
              <td className="border p-2">
                {borrow.book?.categories && borrow.book.categories.length > 0
                  ? borrow.book.categories[0].name
                  : "n/a"}
              </td>

              {/* EDIT or DELETE buttons */}

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(borrow)}
                  className="text-blue-600 hover:underline"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(borrow.id)}
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
