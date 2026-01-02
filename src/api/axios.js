import axios from "axios";

const api = axios.create({
  baseURL: "https://auramail-2.onrender.com",
  withCredentials: true,
});

export default api;
