import { createPublisher, updatePublisher } from "../api/publishersService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PublisherForm({ initialData, onSuccess, onClose }) {
  const [data, setData] = useState({
    name: "",
    address: "",
    establishmentYear: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        address: initialData.address || "",
        establishmentYear: initialData.establishmentYear || "",
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
        await updatePublisher(initialData.id, data);
        toast.success("Yayımcı başarıyla güncellendi!");
      } else {
        await createPublisher(data);
        toast.success("Yayımcı başarıyla oluşturuldu!");
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
      <h3>{initialData ? "Yayımcıyı Düzenle" : "Yeni Yayımcı Ekle"}</h3>

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
          Adres:
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </label>

        <label>
          Telefon:
          <input
            type="text"
            name="establishmentYear"
            value={data.establishmentYear}
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
