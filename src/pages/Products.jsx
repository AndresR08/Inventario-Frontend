import { useEffect, useState } from "react";
import api from "../api/axiosInstance"; 
import "./Products.css";

const categories = ["Electrónica", "Ropa", "Hogar", "Alimentos", "Servicios", "Otros"];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [newProduct, setNewProduct] = useState({ 
        name: "", 
        price: "", 
        stock: "", 
        category: categories[0]
    });
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = () => {
        api.get("/products").then(res => setProducts(res.data));
    };

    const fetchSales = () => {
        api.get("/sales").then(res => setSales(res.data));
    };

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    const handleDelete = (id) => {
        api.delete(`/products/${id}`).then(() => {
            fetchProducts();
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            api.put(`/products/${editingProduct._id}`, newProduct).then(() => {
                setEditingProduct(null);
                fetchProducts();
            });
        } else {
            api.post("/products", newProduct).then(() => {
                fetchProducts();
            });
        }

        setNewProduct({ name: "", price: "", stock: "", category: categories[0] });
    };

    const handleEdit = (product) => {
        setNewProduct({
            name: product.name || "",
            price: product.price || "",
            stock: product.stock || "",
            category: product.category || categories[0]
        });
        setEditingProduct(product);
    };

    return (
        <div className="container">
            <h1>Lista de Productos</h1>
            <button onClick={fetchProducts} className="refresh-btn">Refrescar</button>
            <form onSubmit={handleSubmit} className="product-form">
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Precio" 
                    value={newProduct.price} 
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Stock" 
                    value={newProduct.stock} 
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} 
                    required 
                />
                <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}        
                    required
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
                <button type="submit">{editingProduct ? "Actualizar" : "Agregar"}</button>
            </form>

            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id} className="product-item">
                        <span>{product.name} - ${product.price} - Stock: {product.stock} - Categoría: {product.category}</span>
                        <div>
                            <button onClick={() => handleEdit(product)} className="edit-btn">Editar</button>
                            <button onClick={() => handleDelete(product._id)} className="delete-btn">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <h2>Ventas Realizadas</h2>
            <ul className="sales-list">
                {sales.map(sale => (
                    <li key={sale._id} className="sale-item">
                        <span>{sale.productName} - Cantidad: {sale.quantity} - Total: ${sale.totalPrice}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
