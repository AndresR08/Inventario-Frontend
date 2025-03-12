import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
