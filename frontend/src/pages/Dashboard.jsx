import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        books: 0,
        questions: 0,
        notes: 0,
        quizzes: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://127.0.0.1:8000/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(response.data);

        } catch (error) {

            console.error("Dashboard error:", error);

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="dashboard-layout">

            {/* Existing Navbar */}
            <Navbar />


            <div className="dashboard-body">

                {/* Existing Sidebar */}
                <Sidebar />


                {/* Main Dashboard */}
                <main className="dashboard-main">


                    {/* =================================
                        WELCOME BANNER
                    ================================= */}

                    <section className="welcome-banner">

                        <div className="welcome-content">

                            <span className="welcome-tag">
                                AI-POWERED LEARNING
                            </span>

                            <h1>
                                Welcome back!
                            </h1>

                            <p>
                                Your intelligent engineering study
                                companion is ready to help you learn,
                                search and revise.
                            </p>

                            <div className="welcome-actions">

                                <button
                                    onClick={() => navigate("/upload")}
                                    className="primary-action"
                                >
                                    📄 Upload Document
                                </button>

                                <button
                                    onClick={() => navigate("/chat")}
                                    className="secondary-action"
                                >
                                    🤖 Ask AI
                                </button>

                            </div>

                        </div>


                        <div className="welcome-illustration">

                            <div className="ai-circle">
                                🤖
                            </div>

                            <div className="floating-icon icon-one">
                                📄
                            </div>

                            <div className="floating-icon icon-two">
                                💬
                            </div>

                            <div className="floating-icon icon-three">
                                📚
                            </div>

                        </div>

                    </section>


                    {/* =================================
                        STATISTICS
                    ================================= */}

                    <section className="stats-grid">


                        {/* Documents */}
                        <div className="stat-card">

                            <div className="stat-icon blue">
                                📄
                            </div>

                            <div>
                                <p className="stat-label">
                                    Documents
                                </p>

                                <h2>
                                    {loading ? "..." : stats.books}
                                </h2>

                                <span>
                                    Uploaded books
                                </span>
                            </div>

                        </div>


                        {/* Questions */}
                        <div className="stat-card">

                            <div className="stat-icon purple">
                                💬
                            </div>

                            <div>
                                <p className="stat-label">
                                    Questions
                                </p>

                                <h2>
                                    {loading ? "..." : stats.questions}
                                </h2>

                                <span>
                                    Questions asked
                                </span>
                            </div>

                        </div>


                        {/* Notes */}
                        <div className="stat-card">

                            <div className="stat-icon green">
                                📝
                            </div>

                            <div>
                                <p className="stat-label">
                                    Notes
                                </p>

                                <h2>
                                    {loading ? "..." : stats.notes}
                                </h2>

                                <span>
                                    Notes generated
                                </span>
                            </div>

                        </div>


                        {/* Quizzes */}
                        <div className="stat-card">

                            <div className="stat-icon orange">
                                🎯
                            </div>

                            <div>
                                <p className="stat-label">
                                    Quizzes
                                </p>

                                <h2>
                                    {loading ? "..." : stats.quizzes}
                                </h2>

                                <span>
                                    Quizzes generated
                                </span>
                            </div>

                        </div>

                    </section>


                    {/* =================================
                        QUICK ACTIONS
                    ================================= */}

                    <div className="section-heading">

                        <div>
                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Continue your learning journey
                            </p>
                        </div>

                    </div>


                    <section className="action-grid">


                        {/* Upload */}
                        <div className="action-card blue-card">

                            <div className="action-icon">
                                📄
                            </div>

                            <h3>
                                Upload Documents
                            </h3>

                            <p>
                                Add engineering textbooks and
                                study materials to your knowledge base.
                            </p>

                            <button
                                onClick={() => navigate("/upload")}
                            >
                                Upload Now →
                            </button>

                        </div>


                        {/* Chat */}
                        <div className="action-card green-card">

                            <div className="action-icon">
                                🤖
                            </div>

                            <h3>
                                Ask AI
                            </h3>

                            <p>
                                Ask questions and get answers
                                from your uploaded documents.
                            </p>

                            <button
                                onClick={() => navigate("/chat")}
                            >
                                Start Chat →
                            </button>

                        </div>


                        {/* Notes */}
                        <div className="action-card purple-card">

                            <div className="action-icon">
                                📝
                            </div>

                            <h3>
                                Notes & Summaries
                            </h3>

                            <p>
                                Create concise study notes from
                                your engineering documents.
                            </p>

                            <button
                                onClick={() => navigate("/notes")}
                            >
                                Create Notes →
                            </button>

                        </div>


                        {/* Quiz */}
                        <div className="action-card orange-card">

                            <div className="action-icon">
                                🎓
                            </div>

                            <h3>
                                Practice Quiz
                            </h3>

                            <p>
                                Test your knowledge with
                                AI-generated quizzes.
                            </p>

                            <button
                                onClick={() => navigate("/quiz")}
                            >
                                Start Quiz →
                            </button>

                        </div>

                    </section>


                    {/* =================================
                        BOTTOM SECTION
                    ================================= */}

                    <section className="bottom-grid">


                        {/* Recent Activity */}
                        <div className="activity-card">

                            <div className="card-header">

                                <div>
                                    <h2>
                                        Your Activity
                                    </h2>

                                    <p>
                                        Your current learning activity
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate("/history")}
                                >
                                    View History →
                                </button>

                            </div>


                            <div className="activity-list">

                                <div className="activity-item">

                                    <div className="activity-symbol blue">
                                        📚
                                    </div>

                                    <div>
                                        <strong>
                                            Documents
                                        </strong>

                                        <p>
                                            {loading
                                                ? "Loading..."
                                                : `${stats.books} document(s) uploaded`}
                                        </p>
                                    </div>

                                </div>


                                <div className="activity-item">

                                    <div className="activity-symbol purple">
                                        💬
                                    </div>

                                    <div>
                                        <strong>
                                            AI Questions
                                        </strong>

                                        <p>
                                            {loading
                                                ? "Loading..."
                                                : `${stats.questions} question(s) asked`}
                                        </p>
                                    </div>

                                </div>


                                <div className="activity-item">

                                    <div className="activity-symbol green">
                                        📝
                                    </div>

                                    <div>
                                        <strong>
                                            Study Notes
                                        </strong>

                                        <p>
                                            {loading
                                                ? "Loading..."
                                                : `${stats.notes} note(s) generated`}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Learning Overview */}
                        <div className="overview-card">

                            <div className="card-header">

                                <div>
                                    <h2>
                                        Learning Overview
                                    </h2>

                                    <p>
                                        Your study resources
                                    </p>
                                </div>

                            </div>


                            <div className="overview-list">

                                <div className="overview-row">

                                    <div className="overview-title">
                                        <span className="dot blue-dot"></span>
                                        Documents
                                    </div>

                                    <strong>
                                        {loading ? "..." : stats.books}
                                    </strong>

                                </div>


                                <div className="progress-track">

                                    <div
                                        className="progress blue-progress"
                                        style={{
                                            width: stats.books > 0
                                                ? "75%"
                                                : "0%"
                                        }}
                                    ></div>

                                </div>


                                <div className="overview-row">

                                    <div className="overview-title">
                                        <span className="dot purple-dot"></span>
                                        Questions
                                    </div>

                                    <strong>
                                        {loading ? "..." : stats.questions}
                                    </strong>

                                </div>


                                <div className="progress-track">

                                    <div
                                        className="progress purple-progress"
                                        style={{
                                            width: stats.questions > 0
                                                ? "80%"
                                                : "0%"
                                        }}
                                    ></div>

                                </div>


                                <div className="overview-row">

                                    <div className="overview-title">
                                        <span className="dot green-dot"></span>
                                        Notes
                                    </div>

                                    <strong>
                                        {loading ? "..." : stats.notes}
                                    </strong>

                                </div>


                                <div className="progress-track">

                                    <div
                                        className="progress green-progress"
                                        style={{
                                            width: stats.notes > 0
                                                ? "60%"
                                                : "0%"
                                        }}
                                    ></div>

                                </div>


                                <div className="overview-row">

                                    <div className="overview-title">
                                        <span className="dot orange-dot"></span>
                                        Quizzes
                                    </div>

                                    <strong>
                                        {loading ? "..." : stats.quizzes}
                                    </strong>

                                </div>


                                <div className="progress-track">

                                    <div
                                        className="progress orange-progress"
                                        style={{
                                            width: stats.quizzes > 0
                                                ? "65%"
                                                : "0%"
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}