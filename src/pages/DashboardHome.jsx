import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalIncome: 0,
    totalSalesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos y contar
        const prodRes = await axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const totalProducts = prodRes.data.length;

        // Obtener usuarios y contar
        const userRes = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const totalUsers = userRes.data.length;

        // Obtener estadísticas de ventas
        const saleRes = await axios.get(`${API_URL}/sales/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { totalSales, totalIncome } = saleRes.data;

        setStats({
          totalProducts,
          totalUsers,
          totalIncome,
          totalSalesCount: totalSales,
        });
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <section className="dashboard-summary">
      <div className="summary-card">
        <h3>📦 Productos</h3>
        <p>{stats.totalProducts} registrados</p>
      </div>
      <div className="summary-card">
        <h3>👥 Usuarios</h3>
        <p>{stats.totalUsers} activos</p>
      </div>
      <div className="summary-card">
        <h3>📊 Ventas</h3>
        <p>${stats.totalIncome.toLocaleString()} este mes</p>
      </div>
      <div className="summary-card">
        <h3>📈 Reportes</h3>
        <p>{stats.totalSalesCount} nuevos</p>
      </div>
    </section>
  );
};

export default DashboardHome;
