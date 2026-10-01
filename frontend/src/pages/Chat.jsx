import { useState, useRef, useEffect } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Chat.css";


export default function Chat() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);


    // ==========================================
    // AUTO SCROLL
    // ==========================================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);


    // ==========================================
    // ASK QUESTION
    // ==========================================

    async function askQuestion() {

        if (!question.trim() || loading) {
            return;
        }


        const userQuestion = question.trim();


        // Add user message

        setMessages((prev) => [

            ...prev,

            {
                sender: "user",
                text: userQuestion
            }

        ]);


        setQuestion("");

        setLoading(true);


        try {

            const response = await api.post(
                "/chat/",
                {
                    question: userQuestion
                }
            );


            setMessages((prev) => [

                ...prev,

                {
                    sender: "bot",

                    text:
                        response.data.answer ||
                        "I couldn't generate an answer.",

                    source:
                        response.data.source
                }

            ]);


        } catch (error) {

            console.error(
                "Chat error:",
                error
            );


            setMessages((prev) => [

                ...prev,

                {
                    sender: "bot",

                    text:
                        error.response?.data?.detail ||
                        error.message ||
                        "Unable to get a response from the AI assistant."
                }

            ]);

        } finally {

            setLoading(false);

        }
    }


    // ==========================================
    // ENTER KEY
    // ==========================================

    function handleKeyDown(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            askQuestion();

        }
    }


    // ==========================================
    // CLEAR CHAT
    // ==========================================

    function clearChat() {

        setMessages([]);

    }


    return (

        <div className="chat-page">

            {/* =====================================
                NAVBAR
            ===================================== */}

            <Navbar />


            <div className="chat-layout">


                {/* =====================================
                    SIDEBAR
                ===================================== */}

                <Sidebar />


                {/* =====================================
                    MAIN
                ===================================== */}

                <main className="chat-main">


                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="chat-header">

                        <div className="chat-title-section">

                            <span className="chat-tag">
                                AI STUDY ASSISTANT
                            </span>

                            <h1>
                                🤖 Engineering AI Chat
                            </h1>

                            <p>
                                Ask questions and get answers
                                from your uploaded engineering
                                textbooks.
                            </p>

                        </div>


                        {messages.length > 0 && (

                            <button
                                className="clear-chat-button"
                                onClick={clearChat}
                            >

                                🗑 Clear Chat

                            </button>

                        )}

                    </div>


                    {/* =================================
                        CHAT CONTAINER
                    ================================= */}

                    <div className="chat-container">


                        {/* =================================
                            EMPTY STATE
                        ================================= */}

                        {messages.length === 0 && !loading && (

                            <div className="chat-empty">

                                <div className="chat-empty-icon">
                                    🤖
                                </div>


                                <h2>
                                    Start a conversation
                                </h2>


                                <p>
                                    Ask anything about your
                                    uploaded engineering books.
                                </p>


                                <div className="suggestion-list">


                                    <button
                                        onClick={() => {
                                            setQuestion(
                                                "What are the important concepts in this book?"
                                            );
                                        }}
                                    >

                                        💡 Important concepts

                                    </button>


                                    <button
                                        onClick={() => {
                                            setQuestion(
                                                "Explain this topic in simple words."
                                            );
                                        }}
                                    >

                                        📚 Explain a topic

                                    </button>


                                    <button
                                        onClick={() => {
                                            setQuestion(
                                                "Give me a summary of this topic."
                                            );
                                        }}
                                    >

                                        📝 Generate summary

                                    </button>


                                </div>

                            </div>

                        )}


                        {/* =================================
                            MESSAGES
                        ================================= */}

                        {messages.length > 0 && (

                            <div className="messages-container">

                                {messages.map(
                                    (msg, index) => (

                                        <div
                                            key={index}

                                            className={
                                                msg.sender === "user"
                                                    ? "message-row user-row"
                                                    : "message-row bot-row"
                                            }
                                        >


                                            {/* AVATAR */}

                                            <div className="message-avatar">

                                                {msg.sender === "user"
                                                    ? "M"
                                                    : "🤖"}

                                            </div>


                                            {/* MESSAGE */}

                                            <div className="message-content">

                                                <div className="message-name">

                                                    {msg.sender === "user"
                                                        ? "You"
                                                        : "RAG Assistant"}

                                                </div>


                                                <div
                                                    className={
                                                        msg.sender === "user"
                                                            ? "message-bubble user-message"
                                                            : "message-bubble bot-message"
                                                    }
                                                >

                                                    {msg.text}


                                                    {/* SOURCE */}

                                                    {msg.sender === "bot" &&
                                                        msg.source && (

                                                            <div className="message-source">

                                                                <div className="source-title">
                                                                    📚 Source
                                                                </div>

                                                                <div className="source-name">
                                                                    📘 {msg.source}
                                                                </div>

                                                            </div>

                                                        )}

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}


                                {/* =================================
                                    THINKING
                                ================================= */}

                                {loading && (

                                    <div className="message-row bot-row">

                                        <div className="message-avatar">
                                            🤖
                                        </div>


                                        <div className="message-content">

                                            <div className="message-name">
                                                RAG Assistant
                                            </div>


                                            <div className="message-bubble bot-message thinking">

                                                <span></span>
                                                <span></span>
                                                <span></span>

                                                <label>
                                                    Gemma 3 is thinking...
                                                </label>

                                            </div>

                                        </div>

                                    </div>

                                )}


                                <div ref={messagesEndRef} />

                            </div>

                        )}

                    </div>


                    {/* =================================
                        INPUT AREA
                    ================================= */}

                    <div className="chat-input-area">


                        <div className="chat-input-wrapper">

                            <textarea
                                value={question}

                                placeholder="Ask anything from your engineering books..."

                                onChange={(e) =>
                                    setQuestion(
                                        e.target.value
                                    )
                                }

                                onKeyDown={handleKeyDown}

                                rows="1"
                            />


                            <button
                                className="send-button"

                                onClick={askQuestion}

                                disabled={
                                    loading ||
                                    !question.trim()
                                }
                            >

                                <span>
                                    ➤
                                </span>

                                Send

                            </button>

                        </div>


                        <div className="chat-input-footer">

                            🔒 Your documents stay private
                            and are processed through your
                            local AI system.

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );
}