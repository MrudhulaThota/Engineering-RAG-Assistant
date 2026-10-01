import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "./History.css";


export default function History() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // ==========================================
    // LOAD HISTORY
    // ==========================================

    useEffect(() => {
        loadHistory();
    }, []);


    async function loadHistory() {

        try {

            const token =
                localStorage.getItem("token");


            const response = await axios.get(
                "http://127.0.0.1:8000/history/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            console.log(
                "HISTORY DATA:",
                response.data
            );


            setHistory(response.data);


        } catch (err) {

            console.error(
                "HISTORY ERROR:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.message ||
                "Unable to load chat history"
            );


        } finally {

            setLoading(false);

        }
    }


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredHistory =
        history.filter((chat) => {

            const question =
                chat.question?.toLowerCase() || "";

            const answer =
                chat.answer?.toLowerCase() || "";

            const searchText =
                search.toLowerCase();

            return (
                question.includes(searchText) ||
                answer.includes(searchText)
            );

        });


    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {

        if (!date) {
            return "";
        }


        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );
    }


    return (

        <div className="history-page">


            {/* =================================
                NAVBAR
            ================================= */}

            <Navbar />


            <div className="history-layout">


                {/* =================================
                    SIDEBAR
                ================================= */}

                <Sidebar />


                {/* =================================
                    MAIN CONTENT
                ================================= */}

                <main className="history-main">


                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="history-header">

                        <div>

                            <span className="history-tag">
                                CONVERSATION HISTORY
                            </span>

                            <h1>
                                Chat History
                            </h1>

                            <p>
                                Review your previous questions
                                and AI-generated answers from
                                your engineering documents.
                            </p>

                        </div>


                        <div className="history-count">

                            <div className="history-count-icon">
                                💬
                            </div>

                            <div>

                                <strong>
                                    {history.length}
                                </strong>

                                <span>
                                    Conversations
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        SEARCH
                    ================================= */}

                    <div className="history-toolbar">

                        <div className="history-search">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search your conversations..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* =================================
                        LOADING
                    ================================= */}

                    {loading && (

                        <div className="history-state">

                            <div className="history-state-icon">
                                💬
                            </div>

                            <h2>
                                Loading chat history...
                            </h2>

                            <p>
                                Fetching your previous conversations.
                            </p>

                        </div>

                    )}


                    {/* =================================
                        ERROR
                    ================================= */}

                    {!loading && error && (

                        <div className="history-error">

                            <div className="error-icon">
                                ⚠️
                            </div>

                            <div>

                                <strong>
                                    Unable to load chat history
                                </strong>

                                <p>
                                    {error}
                                </p>

                            </div>

                        </div>

                    )}


                    {/* =================================
                        EMPTY
                    ================================= */}

                    {!loading &&
                        !error &&
                        history.length === 0 && (

                            <div className="history-state">

                                <div className="history-state-icon">
                                    💬
                                </div>

                                <h2>
                                    No chat history yet
                                </h2>

                                <p>
                                    Ask a question in AI Chat
                                    to start building your
                                    conversation history.
                                </p>

                            </div>

                        )}


                    {/* =================================
                        NO SEARCH RESULTS
                    ================================= */}

                    {!loading &&
                        !error &&
                        history.length > 0 &&
                        filteredHistory.length === 0 && (

                            <div className="history-state compact">

                                <div className="history-state-icon">
                                    🔍
                                </div>

                                <h2>
                                    No matching conversations
                                </h2>

                                <p>
                                    Try searching for a different
                                    question or topic.
                                </p>

                            </div>

                        )}


                    {/* =================================
                        HISTORY CARDS
                    ================================= */}

                    {!loading &&
                        !error &&
                        filteredHistory.length > 0 && (

                            <div className="history-list">

                                {filteredHistory.map(
                                    (chat) => (

                                        <article
                                            className="history-card"
                                            key={chat.id}
                                        >


                                            {/* =====================
                                                CARD HEADER
                                            ====================== */}

                                            <div className="history-card-header">

                                                <div className="history-question-icon">
                                                    💬
                                                </div>


                                                <div className="history-question">

                                                    <span>
                                                        QUESTION
                                                    </span>

                                                    <h2>
                                                        {chat.question}
                                                    </h2>

                                                </div>


                                                {chat.created_at && (

                                                    <time>
                                                        {formatDate(
                                                            chat.created_at
                                                        )}
                                                    </time>

                                                )}

                                            </div>


                                            {/* =====================
                                                ANSWER
                                            ====================== */}

                                            <div className="history-answer">

                                                <div className="answer-heading">

                                                    <div className="answer-icon">
                                                        🤖
                                                    </div>

                                                    <strong>
                                                        RAG Assistant
                                                    </strong>

                                                </div>


                                                <p>
                                                    {chat.answer}
                                                </p>

                                            </div>


                                            {/* =====================
                                                SOURCE
                                            ====================== */}

                                            <div className="history-footer">

                                                <div className="history-source">

                                                    <span>
                                                        📚
                                                    </span>

                                                    <div>

                                                        <small>
                                                            SOURCE
                                                        </small>

                                                        <strong>
                                                            {chat.source ||
                                                                "Unknown"}
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>


                                        </article>

                                    )
                                )}

                            </div>

                        )}

                </main>

            </div>

        </div>

    );
}