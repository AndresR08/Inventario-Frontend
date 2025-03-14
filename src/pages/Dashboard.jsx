import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../config";
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

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/sales/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Estadísticas obtenidas:", res.data);  // Debug: muestra en consola la respuesta
      setStats(res.data);
    } catch (error) {
      console.error("Error al obtener estadísticas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(fetchStats, 60000); // Actualiza cada 60 segundos
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>📊 Mi Panel</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                🏠 Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                📦 Productos
              </NavLink>
            </li>
            {user?.role === "admin" && (
              <>
                <li>
                  <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
                    👥 Usuarios
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new-sale" className={({ isActive }) => (isActive ? "active" : "")}>
                    💳 Nueva Venta
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
                📊 Reportes
              </NavLink>
            </li>
            <li>
              <NavLink to="/sales" className={({ isActive }) => (isActive ? "active" : "")}>
                💸 Ventas Realizadas
              </NavLink>
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

        {/* Estadísticas obtenidas desde el backend */}
        <section className="dashboard-stats">
          <div>Total Ventas: {loading ? "Cargando..." : stats.totalSales}</div>
          <div>Total Ingresos: ${loading ? "Cargando..." : stats.totalIncome}</div>
          <div>Total Productos Vendidos: {loading ? "Cargando..." : stats.totalProductsSold}</div>
          <button onClick={fetchStats}>Actualizar Estadísticas</button>
        </section>

        {/* Resumen de datos (DashboardHome) */}
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
