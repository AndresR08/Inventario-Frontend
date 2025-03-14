import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config"; // Importamos la configuración

const NewSale = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Obtener productos de la base de datos
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleData = {
        product: selectedProduct,
        quantity,
      };
      const response = await axios.post(`${API_URL}/sales`, saleData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccessMessage("Venta registrada con éxito.");
      setErrorMessage("");
      // Opcional: Limpiar campos después de registrar la venta
      setSelectedProduct("");
      setQuantity(1);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      setErrorMessage("Error al registrar la venta.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Producto</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
};

export default NewSale;
