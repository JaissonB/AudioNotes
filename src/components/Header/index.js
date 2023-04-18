import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlinePlus, AiOutlineClose, AiOutlineMessage, AiOutlineUser, AiOutlineSend, AiOutlineLogout } from "react-icons/ai";
import "./styles.css";

const Header = ({ title, conversations, handleActualConversation }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(title)
    }, [])

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
                        {
                            conversations?.map((conversation) => {
                                return (
                                    <div
                                        className="divConversation"
                                        key={conversation.id}
                                        onClick={() => {
                                            handleActualConversation(conversation);
                                            setShowMenu(false);
                                        }}
                                    >
                                        <AiOutlineMessage size={20} className="icon" />
                                        <p>{conversation.name}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="menuFooter">
                            <div
                                className="optionMenuFooter"
                                onClick={() => navigate("/cadastre")}
                            >
                                <AiOutlineUser size={20} className="icon" />
                                <p>Account</p>
                            </div>
                            <div
                                className="optionMenuFooter"
                                onClick={() => {
                                    setShowMenu(false);
                                }}
                            >
                                <AiOutlineSend size={20} className="icon iconSend" />
                                <p>Send on Whatsapp</p>
                            </div>
                            <div
                                className="optionMenuFooter"
                                onClick={() => {
                                    setShowMenu(false);
                                }}
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