import React, { useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {SpeechRecognitionText} from "../../components/Speech";
import Header from "../../components/Header";
import mic from "../../assets/mic.png"
import "./styles.css"

const Home = () => {
    const [isRecording, setIsRecording] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "Lorem"
        },
        {
            id: 2,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "Lorem"
        },
        {
            id: 3,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
            command: 'Autes, pesquisar sobre * no Google.',
            callback: (site) => {
                window.open(`https://www.google.com/search?q=${site}`)
            },
        },
        // {
        //     command: 'Lisa, cor *.',
        //     callback: (cor) => {
        //         document.body.style.background = cor;
        //         if(cor === 'Black') document.getElementById('h1-text').style.color = 'white'
        //         else document.getElementById('h1-text').style.color = 'black'
        //     }
        // }
    ]

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
            SpeechRecognition.startListening({continuous: true, language: 'pt-BR'});
            setIsRecording(!isRecording);
        }
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
            <Header />
            <div className="main">
                <p>TESTE PORRA</p>
                {
                    messages.map((message) => {
                        return (
                            <div className="divMessage" key={message.id}>
                                <p className="pMessage">{message.message}</p>
                            </div>
                        )
                    })
                }
                {
                    transcript &&
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