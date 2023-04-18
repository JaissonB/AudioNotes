import React, { useState } from "react";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();
        await api.post("/authenticate", {
            email: email,
            password: password
        }).then((result) => {
            localStorage.setItem("TOKEN", result.data.token);
            localStorage.setItem("loggedUserId", result.data.userId);
            localStorage.setItem("loggedFirstName", result.data.firstName);
            api.defaults.headers.common['authorization'] = `Bearer ${result.data.token}`;
            navigate("/home");
        }).catch(err => console.error(err))
    }

    return (
        <div className="container">
            <img src={logo} className="logo" />
            <form className="formLogin" onSubmit={submitLogin}>
                <div className="divField">
                    <label>E-mail</label>
                    <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="divField">
                    <label>Senha</label>
                    <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="buttonSubmit">Entrar</button>
                <button 
                    className="buttonCadastre"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/cadastre");
                    }}
                >
                    Criar conta
                </button>
            </form>
        </div>
    )
}

export default Login;