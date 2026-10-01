import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Upload.css";


export default function Upload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [dragActive, setDragActive] = useState(false);

    const [message, setMessage] = useState("");


    // ================================
    // SELECT FILE
    // ================================

    function handleFile(event) {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        validateFile(selectedFile);
    }


    // ================================
    // VALIDATE PDF
    // ================================

    function validateFile(selectedFile) {

        const isPDF =
            selectedFile.type === "application/pdf" ||
            selectedFile.name.toLowerCase().endsWith(".pdf");


        if (!isPDF) {

            setFile(null);

            setMessage(
                "Please select a PDF file."
            );

            return;
        }


        // 50 MB limit

        const maxSize =
            50 * 1024 * 1024;


        if (selectedFile.size > maxSize) {

            setFile(null);

            setMessage(
                "File size must be less than 50 MB."
            );

            return;
        }


        setFile(selectedFile);

        setMessage("");
    }


    // ================================
    // DRAG OVER
    // ================================

    function handleDragOver(event) {

        event.preventDefault();

        setDragActive(true);
    }


    // ================================
    // DRAG LEAVE
    // ================================

    function handleDragLeave(event) {

        event.preventDefault();

        setDragActive(false);
    }


    // ================================
    // DROP
    // ================================

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
    // REMOVE FILE
    // ================================

    function removeFile() {

        setFile(null);

        setMessage("");
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
         * Your backend upload API
         * can be connected here.
         */

        setMessage(
            `"${file.name}" is ready for processing.`
        );
    }


    return (

        <div className="upload-page">

            {/* =================================
                TOP NAVBAR
            ================================= */}

            <Navbar />


            <div className="upload-container">


                {/* =================================
                    SIDEBAR
                ================================= */}

                <Sidebar />


                {/* =================================
                    MAIN CONTENT
                ================================= */}

                <main className="upload-main">


                    {/* =================================
                        HEADER
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
                        UPLOAD AREA
                    ================================= */}

                    <div
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


                        {/* FILE BUTTON */}

                        <label
                            htmlFor="pdf-upload"
                            className="choose-file"
                        >

                            📁 Choose PDF

                        </label>


                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFile}
                            hidden
                        />


                        <p className="file-support">

                            PDF files only • Maximum size 50 MB

                        </p>


                        {/* =================================
                            SELECTED FILE
                        ================================= */}

                        {file && (

                            <div className="selected-file">

                                <div className="selected-file-icon">
                                    📄
                                </div>


                                <div className="selected-file-info">

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
                                    onClick={removeFile}
                                >

                                    ×

                                </button>

                            </div>

                        )}


                        {/* =================================
                            UPLOAD BUTTON
                        ================================= */}

                        <button
                            className="upload-button"
                            onClick={handleUpload}
                            disabled={!file}
                        >

                            📤 Upload Document

                        </button>


                        {/* =================================
                            MESSAGE
                        ================================= */}

                        {message && (

                            <div className="upload-message">

                                {message}

                            </div>

                        )}

                    </div>


                    {/* =================================
                        INFORMATION CARDS
                    ================================= */}

                    <div className="upload-info">


                        <div className="info-card">

                            <div className="info-card-icon blue">
                                🔒
                            </div>

                            <div>

                                <h3>
                                    Private & Offline
                                </h3>

                                <p>
                                    Your documents remain
                                    within your local system.
                                </p>

                            </div>

                        </div>


                        <div className="info-card">

                            <div className="info-card-icon purple">
                                🔎
                            </div>

                            <div>

                                <h3>
                                    Semantic Search
                                </h3>

                                <p>
                                    Search your textbooks using
                                    semantic understanding.
                                </p>

                            </div>

                        </div>


                        <div className="info-card">

                            <div className="info-card-icon green">
                                🤖
                            </div>

                            <div>

                                <h3>
                                    AI-Powered Learning
                                </h3>

                                <p>
                                    Ask questions and generate
                                    learning content from documents.
                                </p>

                            </div>

                        </div>


                    </div>


                    {/* =================================
                        BACK BUTTON
                    ================================= */}

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        ← Back to Dashboard

                    </button>


                </main>

            </div>

        </div>

    );
}