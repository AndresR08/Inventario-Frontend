import React, { useEffect, useState } from "react";
import "./DashboardHome.css"; // Importamos los estilos

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalSales: 0,
        totalReports: 0
    });

    useEffect(() => {
        // Simulación de datos (puedes reemplazarlo con una API real)
        setTimeout(() => {
            setStats({
                totalProducts: 120,
                totalUsers: 35,
                totalSales: 1500000,
                totalReports: 5
            });
        }, 1000);
    }, []);

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
                <p>${stats.totalSales.toLocaleString()} este mes</p>
            </div>
            <div className="summary-card">
                <h3>📈 Reportes</h3>
                <p>{stats.totalReports} nuevos</p>
            </div>
        </section>
    );
};

export default DashboardHome;
