import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://3.142.130.175/api" 
    : "/api"; // En producción, Netlify usará su proxy

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Agregar el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
