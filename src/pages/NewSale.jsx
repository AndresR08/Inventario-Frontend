import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { API_URL } from "../config";

const NewSale = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Obtener productos de la base de datos
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
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
        productId: selectedProduct,
        quantity: parseInt(quantity, 10), // Asegurar que quantity sea número
        userId: user?.id, // Enviar ID del usuario si es necesario
      };

      const response = await api.post("/sales", saleData);
      setSuccessMessage("Venta registrada con éxito.");
      setErrorMessage("");
      
      // Limpiar campos después de registrar la venta
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
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
