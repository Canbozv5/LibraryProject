import { createAuthor, updateAuthor } from "../api/authorService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AuthorForm({ initialData, onSuccess, onClose }) {
  // keeps data for form
  const [data, setData] = useState({
    name: "",
    birthDate: "",
    country: "",
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
        birthDate: initialData.birthDate || "",
        country: initialData.country || "",
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
        await updateAuthor(initialData.id, data);
        toast.success("The author was updated.");
      } else {
        await createAuthor(data);
        toast.success("The author was created successfully.");
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
        {initialData ? "Edit Author" : "Add New Author"}
      </h3>

      <form onSubmit={handleSubmit} className="flex justify-evenly">
        {/* Book Name */}
        <label className="text-yellow-400 text-lg">
          Name :
          <input
            className="rounded-md ml-2 text-black"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        {/* Birth Date */}
        <label className="text-yellow-400 text-lg ">
          Birth Date :
          <input
            className="rounded-md ml-2 text-black "
            type="text"
            name="birthDate"
            value={data.birthDate}
            onChange={handleChange}
          />
        </label>

        {/* ountry */}

        <label className="text-yellow-400 text-lg">
          Country :
          <input
            className="rounded-md ml-2 text-black"
            type="text"
            name="country"
            value={data.country}
            onChange={handleChange}
          />
        </label>

        {/* Save or Cancel buttons */}

        <button
          className="text-yellow-400 font-bold hover:text-green-500"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </button>
        <button
          className="text-yellow-400 font-bold hover:text-red-500"
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
