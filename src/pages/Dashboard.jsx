import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import api from "../api/axiosInstance";
import { API_URL } from "../config";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalIncome: 0,
        totalProductsSold: 0,
    });
    const [loading, setLoading] = useState(true);

    // Cargar usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/"); // Redirigir si no hay usuario
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await api.get(`${API_URL}/sales/stats`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            console.log("Estadísticas obtenidas:", res.data);
            setStats(res.data);
        } catch (error) {
            console.error("Error al obtener estadísticas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const intervalId = setInterval(fetchStats, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>📊 Mi Panel</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/dashboard">🏠 Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products">📦 Productos</NavLink>
                        </li>
                        {user?.role === "admin" && (
                            <>
                                <li>
                                    <NavLink to="/users">👥 Usuarios</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/new-sale">💳 Nueva Venta</NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink to="/reports">📊 Reportes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sales">💸 Ventas Realizadas</NavLink>
                        </li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </aside>

            <main className="content">
                <header className="dashboard-header">
                    <h1>Bienvenido al Dashboard</h1>
                    <div className="user-info">
                        <span>👤 {user?.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </header>

                <section className="dashboard-stats">
                    <div>Total Ventas: {loading ? "Cargando..." : stats.totalSales}</div>
                    <div>Total Ingresos: ${loading ? "Cargando..." : stats.totalIncome}</div>
                    <div>Total Productos Vendidos: {loading ? "Cargando..." : stats.totalProductsSold}</div>
                    <button onClick={fetchStats}>Actualizar Estadísticas</button>
                </section>

                <DashboardHome />

                <section className="dashboard-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
