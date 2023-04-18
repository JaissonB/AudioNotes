import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlinePlus, AiOutlineClose, AiOutlineMessage, AiOutlineUser, AiOutlineSend, AiOutlineLogout } from "react-icons/ai";
import "./styles.css";
import api from "../../services/api";

const Header = ({ title, conversations, handleActualConversation }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [userPhone, setUserPhone] = useState("");
    const header = {authorization: `Bearer ${localStorage.getItem("TOKEN")}`}
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        await api.get('/users', {headers: header})
        .then(response => setUserPhone(response.data.phone))
        .catch(error => console.error(error));
    }

    const logout = () => {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("loggedUserId");
        localStorage.removeItem("loggedFirstName");
        navigate("/");
    }
    
    const sendConversationToWhatsapp = async (data) => {
        await api.get(`/conversations/${data.conversation_id}`, { headers: header })
        .then(result => {
            result.data.messages.forEach(message => {
                sendMessage(message);
            });
        })
    }

    const sendMessage = async (message) => {
        await api.post("https://api.z-api.io/instances/3BBFCD789DFF30614E687296C04D749E/token/6093744DB0A96F2A1E7E2309/send-messages",
            {
                phone: "55" + userPhone,
                // phone: "5554996711882",
                message: message.content
            }
        ).then(result => {})
        .catch(error => console.error(error))
    }

    return (
        <div className="header">
            <div className="fixedHeader">
                <AiOutlineMenu size={30} onClick={() => setShowMenu(!showMenu)} />
                <h2>{title}</h2>
                <AiOutlinePlus size={30} />
            </div>
            {
                showMenu &&
                <>
                    <div className="fakeMenu" onClick={() => setShowMenu(false)}></div>
                    <div className="menu">
                        <AiOutlineClose size={30} className="closeMenu" onClick={() => setShowMenu(false)} />
                        <button
                            className="btNewNote"
                            onClick={() => {
                                handleActualConversation("New");
                                setShowMenu(false);
                            }}
                        >
                            <AiOutlinePlus className="menuPlusNote" />
                            <p>Nova ideia</p>
                        </button>
                        <div className="containerConversations">
                            {
                                conversations?.map((conversation) => {
                                    return (
                                        <div
                                            className="divConversation"
                                            key={conversation.conversation_id}
                                        >
                                            <div
                                                className="divConversationFirst"
                                                onClick={() => {
                                                    handleActualConversation(conversation);
                                                    setShowMenu(false);
                                                }}
                                            >
                                                <AiOutlineMessage size={20} className="icon" />
                                                <div className="titleConversation">{`${conversation.conversation_name}`}</div>
                                                <p>{` - ${conversation.category_name}`}</p>
                                            </div>
                                            <AiOutlineSend size={20} className="icon iconSend" onClick={() => sendConversationToWhatsapp(conversation)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="menuFooter">
                            <div
                                className="optionMenuFooter"
                                onClick={() => navigate("/cadastre")}
                            >
                                <AiOutlineUser size={20} className="icon" />
                                <p>Account</p>
                            </div>
                            {/* <div
                                className="optionMenuFooter"
                                onClick={sendMessage}
                            >
                                <AiOutlineSend size={20} className="icon iconSend" />
                                <p>Send on Whatsapp</p>
                            </div> */}
                            <div
                                className="optionMenuFooter"
                                onClick={logout}
                            >
                                <AiOutlineLogout size={20} className="icon" />
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Header;