import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Users from "./pages/Users"; 
import Reports from "./pages/Reports"; 
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />  {/* 🔹 Agregadas */}
      <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />  {/* 🔹 Agregadas */}
    </Routes>
  );
}

export default App;
