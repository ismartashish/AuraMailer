import axios from "axios";

const api = axios.create({
  baseURL: "https://auramail.onrender.com",
  withCredentials: true,
});

export default api;
