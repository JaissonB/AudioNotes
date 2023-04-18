import React, { useState } from "react";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { AiOutlineMessage, AiOutlineArrowLeft } from "react-icons/ai";

const Cadastre = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const submitCadastre = async (e) => {
        e.preventDefault();
        await api.post("/users", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: password
        }).then((result) => {
            // navigate("/home");
            console.log(result)
        }).catch(err => console.error(err))
    }

    return (
        <div className="container">
            <div className="back" onClick={() => navigate("/home")}>
                <AiOutlineArrowLeft size={35} className="chatIcon" />
            </div>
            <img src={logo} className="logo" />
            <form className="formLogin" onSubmit={submitCadastre}>
                <div className="divField">
                    <label>Nome</label>
                    <input type="text" className="input" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="divField">
                    <label>Sobrenome</label>
                    <input type="text" className="input" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="divField">
                    <label>Telefone (somente números)</label>
                    <input type="text" className="input" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="divField">
                    <label>E-mail</label>
                    <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="divField">
                    <label>Senha</label>
                    <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="buttonSubmit">Cadastrar</button>
            </form>
        </div>
    )
}

export default Cadastre;