import { createPublisher, updatePublisher } from "../api/publishersService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// This component menaging Borrow Form
export default function PublisherForm({ initialData, onSuccess, onClose }) {
  // keeps data for form
  const [data, setData] = useState({
    name: "",
    address: "",
    establishmentYear: "",
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
        address: initialData.address || "",
        establishmentYear: initialData.establishmentYear || "",
      });
    }
  }, [initialData]);

  // updates form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
        await updatePublisher(initialData.id, data);
        toast.success("The publisher was updated.");
      } else {
        await createPublisher(data);
        toast.success("The publisher was created successfully.");
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
      <h3>{initialData ? "Edit Publisher" : "Add New Publisher"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </label>

        <label>
          Establishment Year:
          <input
            type="text"
            name="establishmentYear"
            value={data.establishmentYear}
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
