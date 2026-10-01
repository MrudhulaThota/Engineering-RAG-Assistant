import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Upload.css";


export default function UploadBox() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [message, setMessage] = useState("");


    // ================================
    // FILE SELECTION
    // ================================

    function handleFile(event) {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        validateFile(selectedFile);
    }


    // ================================
    // VALIDATE FILE
    // ================================

    function validateFile(selectedFile) {

        if (selectedFile.type !== "application/pdf") {

            setMessage(
                "Please select a PDF file."
            );

            setFile(null);

            return;
        }

        setFile(selectedFile);

        setMessage("");
    }


    // ================================
    // DRAG EVENTS
    // ================================

    function handleDragOver(event) {

        event.preventDefault();

        setDragActive(true);
    }


    function handleDragLeave(event) {

        event.preventDefault();

        setDragActive(false);
    }


    function handleDrop(event) {

        event.preventDefault();

        setDragActive(false);

        const droppedFile =
            event.dataTransfer.files[0];

        if (droppedFile) {

            validateFile(droppedFile);

        }
    }


    // ================================
    // UPLOAD
    // ================================

    function handleUpload() {

        if (!file) {

            setMessage(
                "Please select a PDF before uploading."
            );

            return;
        }


        /*
         * Backend upload API can be connected here.
         *
         * For now we show the selected file
         * as ready for upload.
         */

        setMessage(
            `"${file.name}" is ready to upload.`
        );
    }


    return (

        <div className="upload-layout">

            {/* =================================
                NAVBAR
            ================================= */}

            <Navbar />


            <div className="upload-body">

                {/* =================================
                    SIDEBAR
                ================================= */}

                <Sidebar />


                {/* =================================
                    MAIN CONTENT
                ================================= */}

                <main className="upload-main">


                    {/* =================================
                        PAGE HEADER
                    ================================= */}

                    <div className="upload-header">

                        <div>

                            <span className="upload-tag">
                                DOCUMENT MANAGEMENT
                            </span>

                            <h1>
                                Upload Engineering Documents
                            </h1>

                            <p>
                                Add your engineering textbooks,
                                notes and study materials to your
                                private AI knowledge base.
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        UPLOAD CARD
                    ================================= */}

                    <section
                        className={
                            dragActive
                                ? "upload-card drag-active"
                                : "upload-card"
                        }

                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >


                        {/* ICON */}

                        <div className="upload-icon">

                            📄

                        </div>


                        <h2>
                            Upload a PDF document
                        </h2>


                        <p className="upload-description">

                            Drag and drop your engineering
                            textbook here, or select a file
                            from your computer.

                        </p>


                        {/* FILE INPUT */}

                        <label
                            htmlFor="pdf-upload"
                            className="choose-file-btn"
                        >

                            Choose PDF

                        </label>


                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFile}
                            hidden
                        />


                        <p className="file-support">

                            Supported format: PDF
                            <br />
                            Maximum recommended size: 50 MB

                        </p>


                        {/* SELECTED FILE */}

                        {file && (

                            <div className="selected-file">

                                <div className="file-icon">
                                    📄
                                </div>


                                <div className="file-info">

                                    <strong>
                                        {file.name}
                                    </strong>

                                    <span>
                                        {(
                                            file.size /
                                            (1024 * 1024)
                                        ).toFixed(2)}
                                        {" MB"}
                                    </span>

                                </div>


                                <button
                                    className="remove-file"
                                    onClick={() => {
                                        setFile(null);
                                        setMessage("");
                                    }}
                                >
                                    ×
                                </button>

                            </div>

                        )}


                        {/* UPLOAD BUTTON */}

                        <button
                            className="upload-submit"
                            onClick={handleUpload}
                            disabled={!file}
                        >

                            📤 Upload Document

                        </button>


                        {/* MESSAGE */}

                        {message && (

                            <div className="upload-message">

                                {message}

                            </div>

                        )}

                    </section>


                    {/* =================================
                        INFORMATION CARDS
                    ================================= */}

                    <section className="upload-info-grid">


                        <div className="upload-info-card">

                            <div className="info-icon blue">
                                🔒
                            </div>

                            <div>

                                <h3>
                                    Private & Offline
                                </h3>

                                <p>
                                    Your engineering documents
                                    remain within your local
                                    application environment.
                                </p>

                            </div>

                        </div>


                        <div className="upload-info-card">

                            <div className="info-icon purple">
                                🔎
                            </div>

                            <div>

                                <h3>
                                    Semantic Search
                                </h3>

                                <p>
                                    Uploaded documents can be
                                    processed for intelligent
                                    document-based questions.
                                </p>

                            </div>

                        </div>


                        <div className="upload-info-card">

                            <div className="info-icon green">
                                🤖
                            </div>

                            <div>

                                <h3>
                                    AI-Powered Learning
                                </h3>

                                <p>
                                    Use your documents with the
                                    RAG assistant for study and
                                    revision.
                                </p>

                            </div>

                        </div>


                    </section>


                    {/* =================================
                        BACK TO DASHBOARD
                    ================================= */}

                    <button
                        className="back-dashboard"
                        onClick={() => navigate("/dashboard")}
                    >

                        ← Back to Dashboard

                    </button>


                </main>

            </div>

        </div>

    );
}