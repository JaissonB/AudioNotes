import React, { useEffect, useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { redirect, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import mic from "../../assets/mic.png"
import "./styles.css"
import api from "../../services/api";

const Home = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [actualConversation, setActualConversation] = useState("");
    const [firstName, _] = useState(localStorage.getItem("loggedFirstName"));
    const location = useLocation();
    const header = {authorization: `Bearer ${localStorage.getItem("TOKEN")}`}
    let msgId = location.state?.id || "";
    const [messages, setMessages] = useState([]);

    const [conversations, setConversations] = useState([]);

    const commands = [
        {
            command: 'Gertrudes, para.',
            callback: () => {
                whenStopListening();
            },
        },
        {
            command: 'Gertrudes para.',
            callback: () => {
                whenStopListening();
            },
        },
        {
            command: 'gertrudes para.',
            callback: () => {
                whenStopListening();
            },
        },
        {
            command: 'gertrudes para',
            callback: () => {
                whenStopListening();
            },
        },
        {
            command: 'Gertrudes, Pará.',
            callback: () => {
                whenStopListening();
            },
        },
        {
            command: 'Gertrudes para',
            callback: () => {
                whenStopListening();
            },
        },
    ]

    const getChats = async () => {
        await api.get("/conversations", {headers: header})
        .then(result => setConversations(result?.data))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (localStorage.getItem("TOKEN")) {
            getChats();
        } else {
            navigate("/");
        }
    }, [])

    const {
        transcript, 
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands})

    if (!browserSupportsSpeechRecognition) return (<span>Seu navegador não é compativel com SpeechRecognition.</span>)

    const getActualConversation = async (data) => {
        if (data.conversation_id) {
            await api.get(`/conversations/${data.conversation_id}`, { headers: header })
            .then(result => {
                setActualConversation(result.data);
                setMessages(result.data?.messages);
                getChats();
            })
        } else {
            setActualConversation([]);
            setMessages([]);
        }
    }

    const whenStopListening = async () => {
        SpeechRecognition.stopListening();
        let content = transcript;
        content = content[0].toUpperCase() + content.substring(1);
        await api.post("/messages", {
            content: content,
            conversation_id: actualConversation.conversation_id || null
        }, { headers: header })
        .then(result => {
            getActualConversation(result.data);
        })
        .catch(error => console.error(error))
        setIsRecording(!isRecording);
        resetTranscript();
    }

    const toggleAudio = () => {
        if (isRecording) {
            whenStopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({continuous: true, language: 'pt-BR'});
            setIsRecording(!isRecording);
        }
    }

    const updateActualConversation = conversation => {
        getActualConversation(conversation);
        setActualConversation(conversation);
    }

    const Footer = () => {
        return (
            <div className="footer">
                <button
                    className={`audioRecorder ${isRecording ? "audioRecording" : ""}`}
                    onClick={toggleAudio}
                >
                    <img src={mic} className="micImage"/>
                </button>
                {isRecording && <p>Listening...</p>}
            </div>
        )
    }

    return (
        <>
            <Header title={actualConversation.conversation_name || "Nova ideia"} conversations={conversations} handleActualConversation={updateActualConversation} />
            <div className="main">
                {
                    messages?.length || isRecording ?
                    messages.map((message) => {
                        return (
                            <div key={message.id}>
                                <div className="divMessage">
                                    <p className="pMessage">{message.content}</p>
                                    <p className="pTime">{`${message.messageDate} ${message.messageTime}`}</p>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="emptyMessages">
                        <h3>Bem vindo(a), {firstName}!</h3>
                        <p>Clique no botão abaixo para começar a guardar suas ideias.</p>
                        <p>Diga "Gertrudes, para." para parar a gravação ou clique novamente no botão.</p>
                    </div>
                }
                {
                    transcript && isRecording &&
                    <div className="divMessage">
                        <p className="pMessage">{transcript}</p>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Home;