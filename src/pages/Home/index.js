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
    const [actualConversation, setActualConversation] = useState("New");
    const [firstName, _] = useState(localStorage.getItem("loggedFirstName"));
    const location = useLocation();
    let msgId = location.state?.id || "";
    const [messages, setMessages] = useState([
        // {
        //     id: 1,
        //     message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        // },
        // {
        //     id: 2,
        //     message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        // },
        // {
        //     id: 3,
        //     message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        // }
    ])
    const [conversations, setConversations] = useState([
        {
            id: 1,
            messagesId: [1],
            name: "Conversa Title",
            category: "Lorem"
        },
        {
            id: 2,
            messagesId: [2],
            name: "Conversa Title",
            category: "Lorem"
        },
        {
            id: 3,
            messagesId: [3],
            name: "Conversa Title",
            category: "Lorem"
        }
    ])

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
    ]

    useEffect(() => {
        if (localStorage.getItem("TOKEN")) {
            let header = {'authorization': `Bearer ${localStorage.getItem("TOKEN")}`}
            async function getChats() {
                await api.get("/conversations", {headers: header})
                .then(result => console.log(result))
                .catch(error => console.error(error));
            }
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

    if(!browserSupportsSpeechRecognition) return (<span>Seu navegador não é compativel com SpeechRecognition.</span>)

    const whenStopListening = () => {
        var newMessages = messages;
        var tempId = messages.length + 1;
        SpeechRecognition.stopListening();
        newMessages.push({
            id: tempId,
            message: transcript,
            category: "Lorem"
        })
        setMessages(newMessages);
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
            <Header title={actualConversation.name || "Nova ideia"} conversations={conversations} handleActualConversation={updateActualConversation} />
            <div className="main">
                {
                    messages?.length || isRecording ?
                    messages.map((message) => {
                        return (
                            <div className="divMessage" key={message.id}>
                                <p className="pMessage">{message.message}</p>
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
                {/* <h1 id="h1-text">{transcript}</h1> */}
            </div>
            <Footer />
        </>
    )
}

export default Home;