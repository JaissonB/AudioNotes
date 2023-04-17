import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus, AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import "./styles.css";

const Header = ({ title, conversations, handleActualConversation }) => {
    const [showMenu, setShowMenu] = useState(false);

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
                            <p>New note</p>
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
                                        <AiOutlineMessage size={20} className="chatIcon" />
                                        <p>{conversation.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Header;