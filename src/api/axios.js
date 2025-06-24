import axios from "axios";

const BE_Url = import.meta.env.VITE_BE_URL

const API = axios.create({
  baseURL: BE_Url ,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
