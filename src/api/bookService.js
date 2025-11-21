import axios from "./axios";

const baseURL = "https://libraryproject-backend-2.onrender.com/api/v1";

export const getBooks = () => axios.get(`${baseURL}/books`);
export const getBook = (id) => axios.get(`${baseURL}/books/${id}`);
export const createBook = (data) => axios.post(`${baseURL}/books`, data);
export const updateBook = (id, data) =>
  axios.put(`${baseURL}/books/${id}`, data);
export const deleteBook = (id) => axios.delete(`${baseURL}/books/${id}`);
