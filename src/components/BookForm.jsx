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
      <h3 className="text-amber-900 dark:text-amber-300 text-lg font-semibold">
        {initialData ? "Edit Book" : "Add New Book"}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Book Name */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <label className="text-amber-900 dark:text-amber-300 text-xl mb-1 w-full">
            Book Name :
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label className="text-amber-900 dark:text-amber-300 text-xl mb-1 w-full">
            Publication Year :
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="publicationYear"
              value={data.publicationYear}
              onChange={handleChange}
            />
          </label>

          <label className="text-amber-900 dark:text-amber-300 text-xl mb-1 w-full">
            Stock :
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="stock"
              value={data.stock}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-1">
          <label className="block text-amber-900 dark:text-amber-300 text-xl mb-1">
            Author :
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

        <div className="mb-1">
          <label className="block text-amber-900 dark:text-amber-300 text-xl mb-1">
            Publisher :
          </label>
          <select
            name="publisherId"
            value={data.publisherId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
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

        <div className="mb-1">
          <label className="block text-amber-900 dark:text-amber-300 text-xl mb-1">
            Category :
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

        <button
          className="text-amber-900 dark:text-amber-300 text-xl font-bold hover:text-green-500 dark:hover:text-green-500 hover:border-green-500 border-2 rounded-lg border-amber-900 p-1"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </button>

        <button
          className="text-amber-900 dark:text-amber-300 text-xl font-bold hover:text-red-500 dark:hover:text-red-400 ml-4 hover:border-red-500 border-2 rounded-lg border-amber-900 p-1"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
