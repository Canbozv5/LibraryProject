import { createCategory, updateCategory } from "../api/categoryService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// This component menaging Categories Form
export default function CategoriesForm({ initialData, onSuccess, onClose }) {
  // keeps data for form
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  // for get error logs
  const [errors, setErrors] = useState({});

  // when form is submiting button turn into false
  const [isSubmitting, setIsSubmitting] = useState(false);

  // when you update its fill forms with current data
  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        description: initialData.description || "",
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
    try {
      if (initialData) {
        await updateCategory(initialData.id, data);
        toast.success("The category was updated.");
      } else {
        await createCategory(data);
        toast.success("The category was created successfully."); // feedback to user
      }

      onSuccess(); // to reload the option list after the success
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
      <h3>{initialData ? "Edit Category" : "Add New Category"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Borrower Name */}
        <label>
          Category Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </label>

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
