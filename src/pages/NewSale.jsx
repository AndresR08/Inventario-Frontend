import { useState } from "react";
import axios from "axios";

const NewSale = () => {
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("http://3.142.130.175:5000/api/sales", {
                product,
                quantity,
                total
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            alert("Venta realizada con éxito!");
            setProduct("");
            setQuantity(1);
            setTotal(0);
        } catch (err) {
            setError("Error al realizar la venta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-sale-container">
            <h2>Realizar Nueva Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Producto:</label>
                    <input
                        type="text"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label>Total:</label>
                    <input
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        min="0"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Registrar Venta"}
                </button>
            </form>
        </div>
    );
};

export default NewSale;
