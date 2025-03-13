import axios from "axios";

const apiBaseUrl = "http://3.142.130.175:5000"; // Usa HTTP por ahora

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});



const token = localStorage.getItem("token");
console.log("Token en localStorage:", token);

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Agregar el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token en interceptor:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠ No hay token en localStorage");
    }

    console.log("Headers antes de la petición:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
