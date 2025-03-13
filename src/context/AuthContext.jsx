import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Configuración de la URL base de tu API
const api = axios.create({
    baseURL: 'http://3.142.130.175:5000/api',  
});

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Verificamos el token con una petición a tu endpoint de validación (auth/me o similar)
            api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setLoading(false);  // Termina la carga aunque haya error
                });
        } else {
            setLoading(false);  // Si no hay token, también termina la carga
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
