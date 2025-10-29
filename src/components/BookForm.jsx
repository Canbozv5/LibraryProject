import { createBook, updateBook } from "../api/bookService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAuthors } from "../api/authorService";
import { getCategories } from "../api/categoryService";
import { getPublishers } from "../api/publishersService";

// This component menaging Book Form
export default function BookForm({ initialData, onSuccess, onClose }) {
  // keeps data for form
  const [data, setData] = useState({
    name: "",
    publicationYear: "",
    stock: 0,
    publisherId: "",
    authorId: "",
    categoryId: "",
  });

  // publisher list in select option.
  const [publishers, setPublishers] = useState([]);

  // author list in select option.
  const [authors, setAuthors] = useState([]);

  // category list in select option.
  const [categories, setCategories] = useState([]);

  // for get error logs
  const [errors, setErrors] = useState({});

  // when form is submiting button turn into false
  const [isSubmitting, setIsSubmitting] = useState(false);

  // we are taking all other ones with this API
  const fetchOtherLists = () => {
    Promise.all([getPublishers(), getAuthors(), getCategories()])
      .then(([pub, auth, categ]) => {
        setPublishers(pub.data);
        setAuthors(auth.data);
        setCategories(categ.data);
      })
      .catch((error) => {
        toast.error("Loading error.", error);
      });
  };

  useEffect(() => {
    fetchOtherLists();
  }, []);

  // when you update its fill forms with current data
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

    // updating form
    const load = {
      name: data.name,
      publicationYear: parseInt(data.publicationYear),
      stock: parseInt(data.stock),
      author: data.authorId ? { id: parseInt(data.authorId) } : null,
      publisher: data.publisherId ? { id: parseInt(data.publisherId) } : null,
      categories: data.categoryId ? [{ id: parseInt(data.categoryId) }] : [],
    };

    try {
      if (initialData) {
        await updateBook(initialData.id, load);
        toast.success("The book was updated.");
      } else {
        await createBook(load);
        toast.success("The book was created successfully.");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Something went wrong!", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Layout for form
  return (
    <div>
      <h3>{initialData ? "Edit Book" : "Add New Book"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Book Name */}
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
            Author:
          </label>
          <select
            name="authorId"
            value={data.authorId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Please Select</option>
            {authors.map((aut) => (
              <option key={aut.id} value={aut.id}>
                {aut.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publisher:
          </label>
          <select
            name="publisherId"
            value={data.publisherId}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Please Select</option>
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
            Category:
          </label>
          <select
            name="categoryId"
            value={data.categoryId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Please Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save or Cancel buttons */}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </button>

        <button type="button" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </button>
      </form>
    </div>
  );
}
