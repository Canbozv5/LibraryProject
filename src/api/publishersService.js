import axios from "./axios";

const baseURL = "https://libraryproject-backend-2.onrender.com/api/v1";

export const getPublishers = () => axios.get(`${baseURL}/publishers`);
export const getPublisher = (id) => axios.get(`${baseURL}/publishers/${id}`);
export const createPublisher = (data) =>
  axios.post(`${baseURL}/publishers`, data);
export const updatePublisher = (id, data) =>
  axios.put(`${baseURL}/publishers/${id}`, data);
export const deletePublisher = (id) =>
  axios.delete(`${baseURL}/publishers/${id}`);
