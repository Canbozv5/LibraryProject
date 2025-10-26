import axios from "./axios";

const baseURL = "http://localhost:8080/api/v1";

export const getBorrows = () => axios.get(`${baseURL}/borrows`);
export const getBorrow = (id) => axios.get(`${baseURL}/borrows/${id}`);
export const createBorrow = (data) => axios.post(`${baseURL}/borrows`, data);
export const updateBorrow = (id, data) =>
  axios.put(`${baseURL}/borrows/${id}`, data);
export const deleteBorrow = (id) => axios.delete(`${baseURL}/borrows/${id}`);
