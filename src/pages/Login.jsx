import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "./Login.css";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: "0px", y: "0px" });
    const [coverEyes, setCoverEyes] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            alert("Credenciales incorrectas");
        }
    };

    const handleFocus = (field) => {
        if (field === "email") {
            setEyePosition({ x: "-10px", y: "-5px" });
            setCoverEyes(false);
        } else if (field === "password") {
            setEyePosition({ x: "10px", y: "5px" });
            setCoverEyes(true);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setCoverEyes(!showPassword);
    };

    return (
        <div className="login-container">
            {/* 🟢 Personaje con Ojos */}
            <div className="character">
                <div className="eye left" style={{ transform: `translate(${eyePosition.x}, ${eyePosition.y})` }}></div>
                <div className="eye right" style={{ transform: `translate(${eyePosition.x}, ${eyePosition.y})` }}></div>
                {coverEyes && <div className="cover-eyes"></div>}
            </div>

            {/* 🟢 Formulario */}
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus("email")}
                        required
                    />
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => handleFocus("password")}
                            required
                        />
                        <span className="toggle-password" onClick={handleTogglePassword}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
