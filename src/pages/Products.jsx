import { useEffect, useState } from "react";
import api from "../api/axiosInstance"; 
import "./Products.css";

const categories = ["Electrónica", "Ropa", "Hogar", "Alimentos", "Servicios", "Otros"];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ 
        name: "", 
        price: "", 
        stock: "", 
        category: categories[0] 
    });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        api.get("/products").then(res => setProducts(res.data || [])).catch(err => console.error("Error fetching products:", err));
    }, []);

    const handleDelete = (id) => {
        api.delete(`/products/${id}`).then(() => {
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        }).catch(err => console.error("Error deleting product:", err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Producto a enviar:", newProduct); 

        if (editingProduct) {
            api.put(`/products/${editingProduct._id}`, newProduct).then(res => {
                setProducts(prevProducts => prevProducts.map(p => (p._id === editingProduct._id ? res.data.product : p)));
                setEditingProduct(null);
            }).catch(err => console.error("Error updating product:", err));
        } else {
            api.post("/products", newProduct).then(res => {
                setProducts(prevProducts => [...prevProducts, res.data.product]);
            }).catch(err => console.error("Error adding product:", err));
        }

        setNewProduct({ name: "", price: "", stock: "", category: categories[0] });
    };

    const handleEdit = (product) => {
        setNewProduct({
            name: product?.name || "",
            price: product?.price || "",
            stock: product?.stock || "",
            category: product?.category || categories[0]
        });
        setEditingProduct(product);
    };

    return (
        <div className="container">
            <h1>Lista de Productos</h1>
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
                {products.length > 0 ? products.map(product => (
                    product && product._id ? (
                        <li key={product._id} className="product-item">
                            <span>{product.name} - ${product.price} - Stock: {product.stock} - Categoría: {product.category}</span>
                            <div>
                                <button onClick={() => handleEdit(product)} className="edit-btn">Editar</button>
                                <button onClick={() => handleDelete(product._id)} className="delete-btn">Eliminar</button>
                            </div>
                        </li>
                    ) : null
                )) : <p>No hay productos disponibles.</p>}
            </ul>
        </div>
    );
};

export default Products;
