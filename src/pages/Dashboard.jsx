import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../axiosInstance"; // Usando la instancia de axios configurada
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalSales: 0, totalIncome: 0, totalProductsSold: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/sales/stats"); // Usamos la instancia configurada
                setStats(res.data);
            } catch (error) {
                console.error("Error al obtener estadísticas", error);
                setError("Error al cargar las estadísticas. Inténtalo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>📊 Mi Panel</h2>
                <nav>
                    <ul>
                        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>🏠 Inicio</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>📦 Productos</NavLink></li>
                        {user?.role === "admin" && (
                            <li><NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>👥 Usuarios</NavLink></li>
                        )}
                        <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>📊 Reportes</NavLink></li>
                        <li><NavLink to="/sales" className={({ isActive }) => isActive ? "active" : ""}>💸 Ventas Realizadas</NavLink></li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            </aside>

            <main className="content">
                <header className="dashboard-header">
                    <h1>Bienvenido al Dashboard</h1>
                    <div className="user-info">
                        <span>👤 {user?.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </header>

                {/* Estadísticas reales */}
                <section className="dashboard-stats">
                    {loading ? (
                        <div>Cargando...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <>
                            <div>Total Ventas: {stats.totalSales}</div>
                            <div>Total Ingresos: ${stats.totalIncome}</div>
                            <div>Total Productos Vendidos: {stats.totalProductsSold}</div>
                        </>
                    )}
                </section>

                {/* Tarjetas de resumen */}
                <DashboardHome />

                {/* Contenido dinámico */}
                <section className="dashboard-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
