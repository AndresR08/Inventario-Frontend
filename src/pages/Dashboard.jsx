import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleViewSales = () => {
        navigate("/sales"); // Ruta para ver las ventas realizadas
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>📊 Mi Panel</h2>
                <nav>
                    <ul>
                        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>🏠 Inicio</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>📦 Productos</NavLink></li>
                        <li><NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>👥 Usuarios</NavLink></li>
                        <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>📊 Reportes</NavLink></li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            </aside>

            {/* Contenido principal */}
            <main className="content">
                <header className="dashboard-header">
                    <h1>Bienvenido al Dashboard</h1>
                    <div className="user-info">
                        <span>👤 Admin</span>
                        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </header>

                {/* Tarjetas de resumen */}
                <DashboardHome />

                {/* Botón para ver las ventas */}
                <section className="dashboard-content">
                    <button className="view-sales-btn" onClick={handleViewSales}>
                        🛒 Ver Ventas Realizadas
                    </button>
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
