import { useState } from "react";
import api from "../api/axiosInstance";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", { name, price, stock, category });
      alert("Producto agregado");
      setName(""); setPrice(""); setStock(""); setCategory("");
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <input type="text" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddProduct;
