import { createBook, updateBook } from "../api/bookService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAuthors } from "../api/authorService";
import { getCategories } from "../api/categoryService";
import { getPublishers } from "../api/publishersService";

export default function BookForm({ initialData, onSuccess, onClose }) {
  const [data, setData] = useState({
    name: "",
    publicationYear: "",
    stock: 0,
    publisherId: "",
    authorId: "",
    categoryId: "",
  });

  const [publishers, setPublishers] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOtherLists = () => {
    Promise.all([getPublishers(), getAuthors(), getCategories()])
      .then(([pub, auth, categ]) => {
        setPublishers(pub.data);
        setAuthors(auth.data);
        setCategories(categ.data);
      })
      .catch((errors) => {
        console.errors("Yükleme hatası", errors);
      });
  };

  useEffect(() => {
    fetchOtherLists();
  }, []);

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        publicationYear: initialData.publicationYear || "",
        stock: initialData.stock || "",
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
      name: data.name,
      publicationYear: data.publicationYear,
      stock: data.stock,
      publisherId: data.publisherId,
      categoryId: data.categoryId,
      authorId: data.authorId,
    };

    try {
      if (initialData) {
        await updateBook(initialData.id, load);
        toast.success("Kitap başarıyla güncellendi!");
      } else {
        await createBook(load);
        toast.success("Kitap başarıyla oluşturuldu!");
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
      <h3>{initialData ? "Kitap Düzenle" : "Yeni Kitap Ekle"}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Publication Year:
          <input
            type="text"
            name="publicationYear"
            value={data.publicationYear}
            onChange={handleChange}
          />
        </label>

        <label>
          Stock:
          <input
            type="text"
            name="stock"
            value={data.stock}
            onChange={handleChange}
          />
        </label>

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
            Yazar:
          </label>
          <select
            name="authorId"
            value={data.authorId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            {authors.map((aut) => (
              <option key={aut.id} value={aut.id}>
                {aut.name}
              </option>
            ))}
          </select>
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
