import { useState, useEffect } from "react";
import { API_URL } from "../config"; // Importamos la configuración

const Reports = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener las ventas desde el backend
    const fetchSales = async () => {
        try {
            const res = await axios.get(`${API_URL}/sales`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setSales(res.data);
        } catch (error) {
            console.error("Error al obtener las ventas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div className="reports-container">
            <h2>📊 Reportes de Ventas</h2>
            {loading ? (
                <p>Cargando ventas...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id}>
                                <td>{sale._id}</td>
                                <td>{sale.product.name}</td>
                                <td>{sale.quantity}</td>
                                <td>${sale.total}</td>
                                <td>{sale.user.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Reports;
