import axios from "./axios";

const baseURL = "http://localhost:8080/api/v1";

export const getCategories = () => axios.get(`${baseURL}/categories`);
export const getCategory = (id) => axios.get(`${baseURL}/categories/${id}`);
export const createCategory = (data) =>
  axios.post(`${baseURL}/categories`, data);
export const updateCategory = (id, data) =>
  axios.put(`${baseURL}/categories/${id}`, data);
export const deleteCategory = (id) =>
  axios.delete(`${baseURL}/categories/${id}`);
