import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://libraryproject-backend-2.onrender.com/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      const data = error.response.data || {};
      const msg =
        data.message ||
        data.error ||
        (typeof data === "string" ? data : null) ||
        error.response.statusText ||
        "Bilinmeyen sunucu hatası";

      toast.error(`Hata ${status}: ${msg}`);
    } else if (error.request) {
      toast.error("Sunucuya ulaşılamıyor. (Network veya CORS hatası)");
    } else {
      toast.error("Bir hata oluştu: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
