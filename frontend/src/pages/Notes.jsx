import { useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Notes.css";

export default function Notes() {

    const [topic, setTopic] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateNotes() {

        if (!topic.trim()) {
            alert("Please enter a topic");
            return;
        }

        try {

            setLoading(true);
            setNotes("");

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/notes",
                {
                    topic: topic.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotes(response.data.notes);

        } catch (err) {

            console.error("Notes error:", err);

            const message =
                err.response?.data?.detail ||
                err.message ||
                "Failed to generate notes";

            alert(
                "Notes Generation Failed\n\n" +
                message
            );

        } finally {

            setLoading(false);

        }
    }


    function handleKeyDown(e) {

        if (e.key === "Enter") {
            generateNotes();
        }

    }


    return (

        <div className="notes-page">

            <Navbar />


            <div className="notes-layout">

                <Sidebar />


                <main className="notes-main">


                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="notes-header">

                        <div>

                            <span className="notes-tag">
                                AI-POWERED LEARNING
                            </span>

                            <h1>
                                AI Notes Generator
                            </h1>

                            <p>
                                Generate concise and useful
                                study notes from your engineering
                                topics.
                            </p>

                        </div>


                        <div className="notes-header-icon">
                            📝
                        </div>

                    </div>


                    {/* =================================
                        GENERATOR CARD
                    ================================= */}

                    <section className="notes-generator">

                        <div className="generator-title">

                            <div className="generator-icon">
                                ✨
                            </div>

                            <div>

                                <h2>
                                    Create Study Notes
                                </h2>

                                <p>
                                    Enter a topic and let your
                                    local AI assistant generate
                                    study-ready notes.
                                </p>

                            </div>

                        </div>


                        <div className="notes-input-row">

                            <input
                                value={topic}
                                onChange={(e) =>
                                    setTopic(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Enter a topic, e.g. Natural Language Processing"
                                disabled={loading}
                            />


                            <button
                                onClick={generateNotes}
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        ✨ Generate Notes
                                    </>
                                )}

                            </button>

                        </div>


                        <div className="generator-hint">

                            💡 Tip: Enter a specific engineering
                            topic for more focused notes.

                        </div>

                    </section>


                    {/* =================================
                        LOADING
                    ================================= */}

                    {loading && (

                        <section className="notes-loading">

                            <div className="loading-icon">
                                🤖
                            </div>

                            <div>

                                <h3>
                                    Generating your notes...
                                </h3>

                                <p>
                                    Your AI assistant is preparing
                                    study material from your
                                    engineering content.
                                </p>

                            </div>

                        </section>

                    )}


                    {/* =================================
                        NOTES RESULT
                    ================================= */}

                    {notes && !loading && (

                        <section className="notes-result">

                            <div className="result-header">

                                <div>

                                    <span>
                                        GENERATED NOTES
                                    </span>

                                    <h2>
                                        📝 {topic}
                                    </h2>

                                </div>

                                <div className="result-status">
                                    ✓ Ready
                                </div>

                            </div>


                            <div className="notes-content">

                                <pre>
                                    {notes}
                                </pre>

                            </div>

                        </section>

                    )}


                    {/* =================================
                        EMPTY STATE
                    ================================= */}

                    {!notes && !loading && (

                        <section className="notes-empty">

                            <div className="empty-icon">
                                📝
                            </div>

                            <h2>
                                Your notes will appear here
                            </h2>

                            <p>
                                Enter an engineering topic above
                                and click <strong>Generate Notes</strong>
                                to create your study material.
                            </p>

                        </section>

                    )}

                </main>

            </div>

        </div>

    );
}