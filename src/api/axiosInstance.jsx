import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Eliminamos la IP para que use el proxy de Netlify
  headers: { "Content-Type": "application/json" },
});

const token = localStorage.getItem("token");

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

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
