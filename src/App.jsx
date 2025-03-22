import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import NewSale from "./pages/NewSale";


const PrivateRoute = ({ element }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return user ? element : <Navigate to="/" />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/products" element={<PrivateRoute element={<Products />} />} />
            <Route path="/sales" element={<PrivateRoute element={<Sales />} />} />
            <Route path="/users" element={<PrivateRoute element={<Users />} />} />
            <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
            <Route path="/new-sale" element={<PrivateRoute element={<NewSale />} />} />
        </Routes>
    );
=======
import BusinessConfigForm from "./components/BusinessConfigForm";

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/products" element={<PrivateRoute element={<Products />} />} />
      <Route path="/sales" element={<PrivateRoute element={<Sales />} />} />
      <Route path="/users" element={<PrivateRoute element={<Users />} />} />
      <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
      <Route path="/new-sale" element={<PrivateRoute element={<NewSale />} />} />
      {/* Nueva ruta para la configuración del negocio */}
      <Route path="/business-config" element={<PrivateRoute element={<BusinessConfigForm />} />} />
    </Routes>
  );

}

export default App;
