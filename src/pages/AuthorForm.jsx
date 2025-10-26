import { createAuthor, updateAuthor } from "../api/authorService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AuthorForm({ initialData, onSuccess, onClose }) {
  const [data, setData] = useState({
    name: "",
    birthDate: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        birthDate: initialData.birthDate || "",
        country: initialData.country || "",
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
        await updateAuthor(initialData.id, data);
        toast.success("Yazar başarıyla güncellendi!");
      } else {
        await createAuthor(data);
        toast.success("Yazar başarıyla kayıt edildi!");
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
      <h3>{initialData ? "Yazarı Düzenle" : "Yeni Yazar Ekle"}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Adı:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Birth Date:
          <input
            type="text"
            name="birthDate"
            value={data.birthDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={data.country}
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
