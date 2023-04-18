import React, { useEffect, useState } from "react";
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
    const userLogged = !!localStorage.getItem("TOKEN");
    const header = {authorization: `Bearer ${localStorage.getItem("TOKEN")}`}
    const navigate = useNavigate();

    const getUserData = async () => {
        let userData;
        await api.get("/users", {headers: header})
        .then(result => {
            userData = result.data;
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setPassword(userData.password);
            setPhone(userData.phone);
        })
    }

    useEffect(() => {
        if (userLogged) {
            getUserData();
        }
    }, [])

    const submitCadastre = async (e) => {
        e.preventDefault();
        if (userLogged) {
            await api.put("/users", {
                email,
                password,
                firstName,
                lastName,
                phone
            }, {headers: header}).then((result) => {
                navigate("/home");
            }).catch(err => console.error(err))
        } else {
            await api.post("/users", {
                email,
                password,
                firstName,
                lastName,
                phone
            }).then((result) => {
                navigate("/");
            }).catch(err => console.error(err))
        }
    }

    return (
        <div className="container">
            <div className="back" onClick={() => userLogged ? navigate("/home") : navigate("/")}>
                <AiOutlineArrowLeft size={35} className="chatIcon" />
            </div>
            <img src={logo} className="logo" />
            <form className="formLogin" onSubmit={submitCadastre}>
                <div className="divField">
                    <label>Nome</label>
                    <input type="text" className="input" onChange={(e) => setFirstName(e.target.value)} defaultValue={firstName} />
                </div>
                <div className="divField">
                    <label>Sobrenome</label>
                    <input type="text" className="input" onChange={(e) => setLastName(e.target.value)} defaultValue={lastName} />
                </div>
                <div className="divField">
                    <label>Telefone (somente números)</label>
                    <input type="text" className="input" onChange={(e) => setPhone(e.target.value)} defaultValue={phone} />
                </div>
                <div className="divField">
                    <label>E-mail</label>
                    <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} defaultValue={email} autoComplete="off" />
                </div>
                <div className="divField">
                    <label>Senha</label>
                    <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} defaultValue={password} autoComplete="off" />
                </div>
                <button className="buttonSubmit">Salvar</button>
            </form>
        </div>
    )
}

export default Cadastre;