import axios from "./axios";

const baseURL = "http://localhost:8080/api/v1";

export const getAuthors = () => axios.get(`${baseURL}/authors`);
export const getAuthor = (id) => axios.get(`${baseURL}/authors/${id}`);
export const createAuthor = (data) => axios.post(`${baseURL}/authors`, data);
export const updateAuthor = (id, data) =>
  axios.put(`${baseURL}/authors/${id}`, data);
export const deleteAuthor = (id) => axios.delete(`${baseURL}/authors/${id}`);
