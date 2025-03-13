import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalSales: 0, totalIncome: 0, totalProductsSold: 0 });
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://3.142.130.175:5000/api/sales/stats", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setStats(res.data);
            } catch (error) {
                console.error("Error al obtener estadísticas", error);
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
                        <li><NavLink to="/new-sale" className={({ isActive }) => isActive ? "active" : ""}>💳 Nueva Venta</NavLink></li>
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
                    <div>Total Ventas: {loading ? "Cargando..." : stats.totalSales}</div>
                    <div>Total Ingresos: ${loading ? "Cargando..." : stats.totalIncome}</div>
                    <div>Total Productos Vendidos: {loading ? "Cargando..." : stats.totalProductsSold}</div>
                </section>

                {/* Tarjetas de resumen con datos reales */}
                <section className="dashboard-summary">
                    <div className="summary-card">
                        <h3>Total de Ventas</h3>
                        <p>{loading ? "Cargando..." : `$${stats.totalIncome}`}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Total de Productos Vendidos</h3>
                        <p>{loading ? "Cargando..." : stats.totalProductsSold}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Total de Ventas</h3>
                        <p>{loading ? "Cargando..." : stats.totalSales}</p>
                    </div>
                </section>

                {/* Contenido dinámico */}
                <section className="dashboard-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
