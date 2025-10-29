import { createBorrow, updateBorrow } from "../api/borrowService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBooks } from "../api/bookService";

// This component menaging Borrow Form
export default function BorrowForm({ initialData, onSuccess, onClose }) {
  // keeps form data
  const [data, setData] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    bookId: "",
  });

  // book list in select option.
  const [books, setBooks] = useState([]);

  // error logs
  const [errors, setErrors] = useState({});

  // when form is submiting button turn into false
  const [isSubmitting, setIsSubmitting] = useState(false);

  // we are taking books with this API
  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      toast.error("Books couldnt load.", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // when you update its fill forms with current data
  useEffect(() => {
    if (initialData) {
      setData({
        borrowerName: initialData.borrowerName || "",
        borrowerMail: initialData.borrowerMail || "",
        borrowingDate: initialData.borrowingDate || "",
        returnDate: initialData.returnDate || "",
        bookId: initialData.book?.id || "",
      });
    }
  }, [initialData]);

  // updates form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // form control
  const validate = () => {
    let formErrors = {};
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // main function when form submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    let load;

    // updating form
    if (initialData) {
      load = {
        borrowerName: data.borrowerName,
        borrowingDate: data.borrowingDate,
        returnDate: data.returnDate || null,
      };
    }

    // new borrow form
    else {
      load = {
        borrowerName: data.borrowerName,
        borrowerMail: data.borrowerMail,
        borrowingDate: data.borrowingDate,
        returnDate: data.returnDate,
        bookForBorrowingRequest: {
          id: parseInt(data.bookId),
        },
      };
    }

    // API request (create or update)
    try {
      if (initialData) {
        await updateBorrow(initialData.id, load);
        toast.success("The borrowing was updated."); // feedback to user
      } else {
        await createBorrow(load);
        toast.success("The borrowing was created successfully.");
      }

      onSuccess(); // to reload the list after the success
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Layout for form
  return (
    <div>
      <h3 className="text-yellow-400 text-lg font-semibold">
        {initialData ? "Edit Borrowing" : "Add New Borrowing"}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Borrower Name */}
        <div className="flex justify-evenly">
          <label className="text-yellow-400 text-lg mb-1 ml-1">
            Borrower Name:
          </label>
          <input
            type="text"
            name="borrowerName"
            value={data.borrowerName}
            onChange={handleChange}
            className="w-50 border rounded-md  text-black"
          />
          {errors.borrowerName && (
            <p className="text-red-500 text-xs mt-1">{errors.borrowerName}</p>
          )}

          {/* Borrower Mail */}

          <label className="text-yellow-400 text-lg mb-1 ml-1">
            Borrower Mail:
          </label>
          <input
            type="email"
            name="borrowerMail"
            value={data.borrowerMail}
            onChange={handleChange}
            className="w-50  border rounded-md  text-black"
          />
          {errors.borrowerMail && (
            <p className="text-red-500 text-xs mt-1">{errors.borrowerMail}</p>
          )}

          {/* Borrowing Date */}

          <label className="text-yellow-400 text-lg mb-1 ml-1">
            Borrowing Date:
          </label>
          <input
            type="date"
            name="borrowingDate"
            value={data.borrowingDate}
            onChange={handleChange}
            className="w-50 border rounded-md  text-black"
          />
          {errors.borrowingDate && (
            <p className="text-red-500 text-xs mt-1">{errors.borrowingDate}</p>
          )}

          {/* Return Date */}

          <label className="block text-yellow-400 text-lg mb-1 ml-1">
            Return Date:
          </label>
          <input
            type="date"
            name="returnDate"
            value={data.returnDate}
            onChange={handleChange}
            className="w-50 border rounded-md  text-black"
          />
        </div>

        {/* book select option */}

        <div className="mb-4">
          <label className="block text-yellow-400 text-lg mb-1">Book:</label>
          <select
            name="bookId"
            value={data.bookId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Please Select</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save or Cancel buttons */}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-yellow-400 text-xl font-bold hover:text-green-500"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-yellow-400 text-xl font-bold hover:text-red-500 ml-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
