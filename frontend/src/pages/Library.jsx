import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Library.css";


export default function Library() {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    useEffect(() => {
        loadDocuments();
    }, []);


    // ==========================================
    // LOAD DOCUMENTS
    // ==========================================

    async function loadDocuments() {

        try {

            const token =
                localStorage.getItem("token");


            const response = await api.get(
                "/library",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            console.log(
                "Library response:",
                response.data
            );


            setDocuments(response.data);


        } catch (err) {

            console.error(
                "Library error:",
                err
            );

        } finally {

            setLoading(false);

        }
    }


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredDocuments =
        documents.filter((doc) =>
            doc.filename
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );


    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {

        if (!date) {
            return "N/A";
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

        <div className="library-page">

            {/* ==================================
                NAVBAR
            ================================== */}

            <Navbar />


            <div className="library-layout">


                {/* ==================================
                    SIDEBAR
                ================================== */}

                <Sidebar />


                {/* ==================================
                    MAIN CONTENT
                ================================== */}

                <main className="library-main">


                    {/* ==================================
                        HEADER
                    ================================== */}

                    <div className="library-header">

                        <div>

                            <span className="library-tag">
                                DOCUMENT LIBRARY
                            </span>

                            <h1>
                                Engineering Library
                            </h1>

                            <p>
                                Manage and access your
                                uploaded engineering
                                textbooks and study
                                documents.
                            </p>

                        </div>


                        {/* DOCUMENT COUNT */}

                        <div className="document-count">

                            <span>
                                📚
                            </span>

                            <div>

                                <strong>
                                    {documents.length}
                                </strong>

                                <small>
                                    Documents
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        SEARCH BAR
                    ================================== */}

                    <div className="library-toolbar">

                        <div className="library-search">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search your documents..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <button
                            className="upload-new-btn"
                            onClick={() =>
                                navigate("/upload")
                            }
                        >

                            📤 Upload Document

                        </button>

                    </div>


                    {/* ==================================
                        CONTENT
                    ================================== */}

                    {loading ? (

                        <div className="library-state">

                            <div className="loading-icon">
                                📚
                            </div>

                            <h2>
                                Loading your library...
                            </h2>

                            <p>
                                Fetching your uploaded documents.
                            </p>

                        </div>

                    ) : documents.length === 0 ? (

                        <div className="library-state">

                            <div className="empty-icon">
                                📂
                            </div>

                            <h2>
                                Your library is empty
                            </h2>

                            <p>
                                Upload an engineering textbook
                                to start building your private
                                knowledge base.
                            </p>

                            <button
                                className="empty-upload-btn"
                                onClick={() =>
                                    navigate("/upload")
                                }
                            >

                                📤 Upload Your First Document

                            </button>

                        </div>

                    ) : filteredDocuments.length === 0 ? (

                        <div className="library-state small">

                            <div className="empty-icon">
                                🔍
                            </div>

                            <h2>
                                No matching documents
                            </h2>

                            <p>
                                Try a different search term.
                            </p>

                        </div>

                    ) : (

                        <div className="documents-grid">

                            {filteredDocuments.map(
                                (doc) => (

                                    <article
                                        className="document-card"
                                        key={doc.id}
                                    >


                                        {/* TOP */}

                                        <div className="document-top">

                                            <div className="document-icon">
                                                📄
                                            </div>


                                            <div className="document-title">

                                                <h2>
                                                    {doc.filename}
                                                </h2>

                                                <span>
                                                    PDF Document
                                                </span>

                                            </div>


                                            <button
                                                className="document-menu"
                                                title="More options"
                                            >
                                                ⋯
                                            </button>

                                        </div>


                                        {/* DIVIDER */}

                                        <div className="document-divider"></div>


                                        {/* DETAILS */}

                                        <div className="document-details">


                                            <div className="detail-row">

                                                <span className="detail-label">
                                                    📁 Location
                                                </span>

                                                <span
                                                    className="detail-value filepath"
                                                    title={doc.filepath}
                                                >
                                                    {doc.filepath}
                                                </span>

                                            </div>


                                            <div className="detail-row">

                                                <span className="detail-label">
                                                    🕒 Uploaded
                                                </span>

                                                <span className="detail-value">
                                                    {formatDate(
                                                        doc.upload_date
                                                    )}
                                                </span>

                                            </div>


                                            <div className="detail-row">

                                                <span className="detail-label">
                                                    Status
                                                </span>

                                                <span className="status-badge">

                                                    <span className="status-dot"></span>

                                                    Uploaded

                                                </span>

                                            </div>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="document-actions">

                                            <button
                                                className="document-action primary"
                                                onClick={() =>
                                                    navigate("/chat")
                                                }
                                            >
                                                🤖 Ask AI
                                            </button>

                                            <button
                                                className="document-action secondary"
                                                onClick={() =>
                                                    navigate("/chat")
                                                }
                                            >
                                                🔎 Search
                                            </button>

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