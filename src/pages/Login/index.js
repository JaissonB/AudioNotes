import React, { useState } from "react";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import "./styles.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (e) => {
        console.log(email)
        e.preventDefault();
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
        await api.post("/authenticate", {
            email: email,
            password: password
        }, {headers}).then((result) => {
            console.log(result)
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
                <button className="buttonSubmit">Login</button>
            </form>
        </div>
    )
}

export default Login;