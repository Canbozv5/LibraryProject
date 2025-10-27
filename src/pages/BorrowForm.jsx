import { createBorrow, updateBorrow } from "../api/borrowService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBooks } from "../api/bookService";
import { getAuthors } from "../api/authorService";
import { getCategories } from "../api/categoryService";
import { getPublishers } from "../api/publishersService";

export default function BorrowForm({ initialData, onSuccess, onClose }) {
  const [data, setData] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    bookId: "",
    publisherId: "",
    authorId: "",
    categoryId: "",
  });

  const [books, setBooks] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [publishers, setPublishers] = useState([]);

  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOtherLists = () => {
    Promise.all([getBooks(), getPublishers(), getAuthors(), getCategories()])
      .then(([book, pub, auth, categ]) => {
        setBooks(book.data);
        setAuthors(auth.data);
        setPublishers(pub.data);
        setCategories(categ.data);
      })
      .catch((errors) => {
        console.error("Yükleme hatası", errors);
      });
  };

  useEffect(() => {
    fetchOtherLists();
  }, []);

  useEffect(() => {
    if (initialData) {
      setData({
        borrowerName: initialData.borrowerName || "",
        borrowerMail: initialData.borrowerMail || "",
        borrowingDate: initialData.borrowingDate || "",
        retrunDate: initialData.retrunDate || "",
        bookId: initialData.bookId || "",
        publisherId: initialData.publisherId || "",
        authorId: initialData.authorId || "",
        categoryId: initialData.categoryId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let formErrors = {};
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const load = {
      borrowerName: data.borrowerName,
      borrowerMail: data.borrowerMail,
      borrowingDate: data.borrowingDate,
      retrunDate: data.retrunDate,
      books: data.bookId ? { id: parseInt(data.bookId) } : null,
      author: data.authorId ? { id: parseInt(data.authorId) } : null,
      publisher: data.publisherId ? { id: parseInt(data.publisherId) } : null,
      categories: data.categoryId ? [{ id: parseInt(data.categoryId) }] : [],
    };

    try {
      if (initialData) {
        await updateBorrow(initialData.id, load);
        toast.success("Ödünç alım başarıyla güncellendi!");
      } else {
        await createBorrow(load);
        toast.success("Ödünç alım başarıyla oluşturuldu!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("API Hatası:", error);
      toast.error("İşlem sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>{initialData ? "Ödünç Alımı Düzenle" : "Yeni Ödünç Alım Ekle"}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Borrower Name:
          <input
            type="text"
            name="borrowerName"
            value={data.borrowerName}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Borrower Mail:
          <input
            type="text"
            name="borrowerMail"
            value={data.borrowerMail}
            onChange={handleChange}
          />
        </label>

        <label>
          Borrowing Date:
          <input
            type="text"
            name="borrowingDate"
            value={data.borrowingDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Return Date:
          <input
            type="text"
            name="returnDate"
            value={data.returnDate}
            onChange={handleChange}
          />
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book:
          </label>
          <select
            name="bookId"
            value={data.bookId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Seçiniz</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yazar:
          </label>
          <select
            name="authorId"
            value={data.authorId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Seçiniz</option>
            {authors.map((aut) => (
              <option key={aut.id} value={aut.id}>
                {aut.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yayımcı:
          </label>
          <select
            name="publisherId"
            value={data.publisherId}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seçiniz</option>
            {publishers.map((pub) => (
              <option key={pub.id} value={pub.id}>
                {pub.name}
              </option>
            ))}
          </select>
          {errors.publisherId && (
            <p className="text-red-500 text-xs mt-1">{errors.publisherId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori:
          </label>
          <select
            name="categoryId"
            value={data.categoryId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Seçiniz</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Kaydediliyor..."
            : initialData
            ? "Güncelle"
            : "Oluştur"}
        </button>

        <button type="button" onClick={onClose} disabled={isSubmitting}>
          İptal
        </button>
      </form>
    </div>
  );
}
