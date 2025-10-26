import { createCategory, updateCategory } from "../api/categoryService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CategoriesForm({ initialData, onSuccess, onClose }) {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        description: initialData.description || "",
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
    try {
      if (initialData) {
        await updateCategory(initialData.id, data);
        toast.success("Category başarıyla güncellendi!");
      } else {
        await createCategory(data);
        toast.success("Category başarıyla oluşturuldu!");
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
      <h3>{initialData ? "Category Düzenle" : "Yeni Category Ekle"}</h3>

      <form onSubmit={handleSubmit}>
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
