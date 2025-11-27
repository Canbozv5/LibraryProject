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
      <h3 className="text-yellow-400 text-lg font-semibold">
        {initialData ? "Edit Publisher" : "Add New Publisher"}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <label className="text-yellow-400 text-lg mb-1 w-full">
            Name:
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label className="text-yellow-400 text-lg mb-1 w-full">
            Address:
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </label>

          <label className="text-yellow-400 text-lg mb-1 w-full">
            Establishment Year:
            <input
              className="w-full ml-0 md:ml-2 border rounded-md text-black p-1"
              type="text"
              name="establishmentYear"
              value={data.establishmentYear}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Save or Cancel buttons */}

        <button
          className="text-yellow-400 text-xl font-bold hover:text-green-500"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </button>

        <button
          className="text-yellow-400 text-xl font-bold hover:text-red-500 ml-4"
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
