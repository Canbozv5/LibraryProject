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
    return (
      <div className="max-w-[1200px] text-white mx-auto p-6">Loading...</div>
    );
  }

  // Layout for List
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* New borrowing button */}

      <button
        onClick={handleNew}
        className="mb-4 p-2 bg-yellow-600 dark:bg-yellow-900 dark:hover:bg-yellow-600 text-white text-lg font-semibold rounded hover:bg-yellow-900 hover:shadow-md hover:shadow-yellow-500 dark:hover:shadow-yellow-700"
      >
        Add New Borrowing
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded shadow-lg shadow-yellow-400 dark:shadow-yellow-700 bg-orange-100 dark:bg-stone-500">
          <BorrowForm
            initialData={selectedBorrow}
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
                Borrower Name
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Borrower Mail
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Borrowing Date
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Return Date
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Book
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Author
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Publisher
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Category
              </th>
              <th className="border p-2 text-amber-900 dark:text-amber-300">
                Actions
              </th>
            </tr>
          </thead>

          {/* List body  */}

          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow.id} className="text-center">
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.id}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.borrowerName}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.borrowerMail}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.borrowingDate}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.returnDate || "Not returned yet."}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.book?.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.book?.author?.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.book?.publisher?.name}
                </td>
                <td className="border p-2 font-medium text-amber-900 dark:text-amber-300 bg-orange-100 dark:bg-stone-500">
                  {borrow.book?.categories && borrow.book.categories.length > 0
                    ? borrow.book.categories[0].name
                    : "n/a"}
                </td>

                {/* EDIT or DELETE buttons */}

                <td className="border p-2 space-x-2 bg-orange-100 dark:bg-stone-500">
                  <button
                    onClick={() => handleEdit(borrow)}
                    className="text-blue-600 dark:text-blue-400 dark:hover:text-blue-700 font-semibold hover:underline"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(borrow.id)}
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
