import axios from "axios";
import { BASE_URL } from "./api";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getOffers = () => API.get("/offers");
export const createOffer = (data) => API.post("/offers", data);
export const updateOffer = (id, data) => API.put(`/offers/${id}`, data);
export const deleteOffer = (id) => API.delete(`/offers/${id}`);
